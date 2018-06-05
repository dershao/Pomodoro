const express = require('express');
const mongoose = require('mongoose');
const urlencodedParser = require('body-parser');
const User = require('../models/User');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').load();
}

module.exports = function(app) {
    
    app.post('/user/register', urlencodedParser, function(req, res) {
        if (req.body.username && req.body.password) {
            
            let newUserData = {
                username: req.body.username,
                password: req.body.password
            }
            
            User.create(newUserData, function (err, user) {
                if (err) {
                    return next(err);
                }
                else {
                    res.redirect('/home');
                }
            });
        }
    });
}

