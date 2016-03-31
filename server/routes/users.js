var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var Config = require('./../config.js');
var mongoose = require('mongoose');
var User = require('./../models/user.js');
var Auth = require('./../lib/auth.js');

mongoose.connect(Config.mongoDBName);

router.post('/login', function(req, res) {
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email or password"
                });
            }
        }
    });
});

router.post('/signin', function(req, res) {
	User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.token = jwt.sign(userModel, "11111111222222222222333333333333333");

                userModel.save(function(err, user) {    
                    res.json({
                        type: true,
                        data: user,
                        token: user.token
                    });
                })
            }
        }
    });
});

router.post('/me', Auth.ensureAuthorized, function(req, res, next) {
	User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });

});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
