/** 
 * User controller. 
 */

const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/User');

router.post('/register', bodyParser.urlencoded({extended: true}), (req, res) => {
    
    if (req.body.username && req.body.password) {
        
        let newUserData = {
            username: req.body.username,
            password: req.body.password
        }
        
        User.create(newUserData, (err, user) => {
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

