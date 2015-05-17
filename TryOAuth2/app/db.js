var mongojs = require('mongojs');

var db = mongojs("localhost" + '/TryOAuth2');

exports.db = function() {
    return db;
};
