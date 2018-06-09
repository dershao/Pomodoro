const router = require('express').Router();
const mongoose = require('mongoose');
const urlencodedParser = require('body-parser');
const User = require('../models/User');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').load();
}
    
router.post('/user/register', urlencodedParser, (req, res) => {
    if (req.body.username && req.body.password) {
        
        let newUserData = {
            username: req.body.username,
            password: req.body.password
        }
        
        User.create(newUserData, (req, res) => {
            if (err) {
                return next(err);
            }
            else {
                res.redirect('/home');
            }
        });
    }
});

module.exports = router;

