var mongoose = require('mongoose');
var User = require('./../models/user.js');

function Auth() {}
Auth.prototype.ensureAuthorized = function (req, res, next) {
	var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;

		User.findOne({token: req.token}, function(err, user) {
	        if (err || user == null) {
	            res.send(403);
	        } else {
	            next();
	        }     
	    });
    } else {
        res.send(403);
    }
}
module.exports = new Auth();