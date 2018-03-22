var db = require("../models");
var authController = require('../controllers/authController.js');

module.exports = function (app) {  
    //POST route for saving an event:
    app.post("/api/events", function (req, res) {
        console.log(req.body);
        db.events.create({
            event_name: req.body.event_name,
            location: req.body.location,
            event_date: req.body.event_date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            userId: req.body.userId
        })
            .then(function (dbevents) {
                res.json(dbevents);
            });
    });

    app.get("/home", function(req, res) {
        var first = req.user.firstname;
        var last = req.user.lastname;
        var user_id = req.user.id;
        db.events.findAll({})
            .then(function (dbevents) {
                var events = dbevents;
             res.render("home", {first: first, last: last, user_id: user_id, events: events});
    });
});

    function getGuest(idEvent){
        return db.guests.findAll({
            where: {
                eventId: idEvent
            }
        })
    }
    // function getItems(event, guests, idEvent, res){
    //     db.items.findAll({
    //         where: {
    //             eventId: idEvent
    //         }
    //     })
    //     .then(function (dbitems) {
    //         var items = dbitems;   
    //         res.render("events", {guests, items, event});
    //     });
    // }

    function getEvents(idEvent){
        return db.events.findOne({
            where: {
                id: idEvent
            }
        })
    }      

    app.get("/events/:id", async function(req, res) {
        var first = req.user.firstname;
        var last = req.user.lastname;
        var user_id = req.user.id;
        var idEvent = req.params.id;
        let event =  await getEvents(idEvent); 
        let guests = await getGuest(idEvent); 

        res.render("events", {guests, event});
    });
        
    //POST route for saving a guest:
    app.post("/api/guests", function (req, res) {
        db.guests.create({
            guest_name: req.body.guest_name,
            contact: req.body.contact,
            eventId: req.body.eventId
        })
        .then(function (dbguests) {
            res.json(dbguests);
        });
    });

    //DELETE route for deleting an event:
    app.delete("/events/api/delete", function (req, res) {
        db.events.destroy({
            where: {
                id: req.body.id
            }
        }).then(function (dbevents) {
            res.json(dbevents);
        });
    });

    //PUT route for updating an event:
    app.put("/api/events", function (req, res) {
        var idEvent = req.body.id;

        db.events.update({
            event_name: req.body.event_name,
            location: req.body.location,
            event_date: req.body.event_date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
        },
        {where: {id: idEvent}})
        .then(function (dbevents) {
            res.json(dbevents);
        });
    });

}