var db = require("../models");

module.exports = function (app) {

    //POST route for saving an event:
    app.post("/api/events", function (req, res) {
        // console.log(req.body);
        db.events.create({
            event_name: req.body.event_name,
            location: req.body.location,
            event_date: req.body.event_date,
            start_time: req.body.start_time,
            end_time: req.body.end_time
        })
            .then(function (dbevents) {
                res.json(dbevents);
            });
    });

    //GET route for all events should we choose to use it:
    app.get("/api/events", function (req, res) {
        db.events.findAll({}).then(function (dbevents) {
            res.json(dbevents);
        });
    });


    //GET route for events and attendees and items:
    app.get("/api/guests", function (req, res) {
        db.guests.findAll({}).then(function (dbguests) {
            res.json(dbguests);
        });

    });
    //POST route for saving guest information:
    app.post("/api/guests", function (req, res) {
        // console.log(req.body);
        db.guests.create({
            guest_name: req.body.guest_name,
            contact: req.body.contact
        })
            .then(function (dbguests) {
                res.json(dbguests);
            });
    });

    //POST route for creating a user:
    app.post("/api/user", function (req, res) {
        db.User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            about: req.body.about,
            email: req.body.email,
            password: req.body.password,

        })
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });

    //POST route for creating items:
    app.post("/api/items", function (req, res) {
        db.items.create({
            item_name: req.body.item_name
        })
            .then(function (dbitems) {
                res.json(dbitems);
            });
    });

    //DELETE route guests
    app.delete("/api/guests/:id", function (req, res) {
        db.guests.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbguests) {
            res.json(dbguests);
        });
    });
};