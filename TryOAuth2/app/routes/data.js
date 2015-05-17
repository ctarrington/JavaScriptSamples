var express = require('express');
var router = express.Router();
var things = [{value: "apple"},
			  {value: "cherry"}
];

router.post('/data/things', function(req, res, next) {
	var thing = req.body;
	things.push(thing);
  	res.send("OK");
});

router.get('/data/things', function(req, res, next) {
  	res.send(things);
});

router.get('/data/things/:index', function(req, res, next) {
	var index = req.params.index;
	var thing = things[index];
  	res.send(thing);
});

module.exports = router;
