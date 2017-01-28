// routes
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

router.get('/register', function(req, res) {
    res.json({ });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.json({ account : account });
        }

        passport.authenticate('local')(req, res, function () {
           res.json({ user : req.user });
        });
    });
});

router.get('/login', function(req, res) {
    res.json({ user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
   res.json({ user : req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.json({ user : req.user });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;

