var path = require("path");
module.exports = function (app) {
    app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname, "../views/index.handlebars"))
    });

    // app.get("/signin", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../views/signin.handlebars"))
    // });


    // app.get("/signup", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../views/signup.handlebars"))
    // });



    app.get("/create", function (req, res) {
        res.sendFile(path.join(__dirname, "../views/event.handlebars"))
    });

    // app.get("/home", function (req, res) {
    //     res.sendFile(path.join(__dirname, "../views/home.handlebars"))
    // });


};