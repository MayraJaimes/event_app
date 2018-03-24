
var express                 = require("express"),
    app                     = express(),
    passport                = require("passport"),
    session                 = require('express-session'),
    bodyParser              = require("body-parser"),
    env                     = require("dotenv"),
    localStrategy           = require("passport-local"),
    path                    = require("path"),
    exphbs                  = require("express-handlebars"),
    moment                  = require("moment");

    var flash=require("connect-flash");

var PORT = process.env.PORT || 3000;

var hbs = exphbs.create({
    defaultLayout: "main",
    helpers: {
        formatDate: function (date, format) {
            return moment(date).add(1, 'day').format(format);
        },
        formatTime: (time) => {
            return moment(time, 'HH:mm a').format("hh:mm a");
        }
    }
})

app.use(flash());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// momentHandler.registerHelpers(exphbs);
 
app.get("/", function(req, res) {
    res.render("index");
});

var models = require("./models");
require("./routes/apiRoutes.js")(app);
var authRoute = require('./routes/auth.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);

//app.use(routes);
//app.use(models);

app.use(express.static("public"));

models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
    app.listen(PORT, function () {
        console.log("Server listening on: http://localhost:" + PORT);
    });
 
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!") 
});

