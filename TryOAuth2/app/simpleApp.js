//Module dependencies
var express = require('express')
    , http = require('http')
    , passport = require('passport')
    , util = require('util')
    , bodyParser = require('body-parser')
    , expressValidator = require('express-validator')
    , auth = require("./auth")
    , mongojs = require('mongojs')
    , db = require('./db').db();

// Express configuration
var app = express();
app.use(bodyParser());
app.use(expressValidator());

app.use(passport.initialize());

app.post('/data/things', function(req, res, next) {
	var thing = req.body;
	db.collection('simpleThings').insert(thing, function(err, obj) {
		if (err) {
			res.send("FAILURE");
		}
		else {
			res.send("OK");
		}
	});
});


app.get('/data/things', passport.authenticate('accessToken', { session: false }), function (req, res) {
    db.collection('simpleThings').find(function(err, things) {
		if (err) {
			res.send("FAILURE");
		}
		else {
			res.send(things);
		}
	});
});

app.get('/data/things/:id', function(req, res, next) {
	var id = req.params.id;
	db.collection('simpleThings').findOne({_id:mongojs.ObjectId(id)}, function(err, thing) {
		if (err) {
			res.send("FAILURE");
		}
		else {
			res.send(thing);
		}
	});
});


//Start
http.createServer(app).listen(process.env.PORT || 3010, process.env.IP || "0.0.0.0");