//Module dependencies
var express = require('express')
    , http = require('http')
    , passport = require('passport')
    , util = require('util')
    , bodyParser = require('body-parser')
    , expressValidator = require('express-validator')
    , auth = require("./auth")

// Express configuration
var app = express();
app.use(bodyParser());
app.use(expressValidator());

app.use(passport.initialize());

var things = [{value: "apple"},
			  {value: "cherry"}
];

app.post('/data/things', function(req, res, next) {
	var thing = req.body;
	things.push(thing);
  	res.send("OK");
});


app.get('/data/things', passport.authenticate('accessToken', { session: false }), function (req, res) {
    res.send(things);
});

app.get('/data/things/:index', function(req, res, next) {
	var index = req.params.index;
	var thing = things[index];
  	res.send(thing);
});


//Start
http.createServer(app).listen(process.env.PORT || 3010, process.env.IP || "0.0.0.0");