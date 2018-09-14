/**
 * Router for all Passport authentication.
 */

const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const sessionCheck = require("../middlewares/sessionCheck");
const isCorrectPassword = require("../utils/isCorrectPassword");

//auth logout
router.get("/logout", function(req, res) {

    req.logout();
    req.session.destroy();
    res.redirect("/login");
});


//auth with gogole
//passport.authenticate('google') - specify what authentication strategy we wish to use
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

//callback url to redirect after authentication is finished
//after authentication, we have a code provided by google which can be exchange for profile information
//since code is present, we no longer need to load consent screen
router.get("/google/redirect", passport.authenticate("google", { failureRedirect: "/login"}), function(req, res) {
    //passport attaches the user to the req object
    res.redirect("/home");
});

router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/redirect", passport.authenticate("facebook", { failureRedirect: "/login"}), function(req, res) {
    res.redirect("/home");
});

router.post("/register", sessionCheck, (req, res) => {

    if (req.body.username && req.body.password) {

        const newUserData = {
            username: req.body.username,
            password: req.body.password
        };

        User(newUserData).save( (err, user) => {
            if (err) {
                res.status(500).json(err);
            }
            else {
                req.session.user = user.username;
                req.session.userId = user._id.toString();
                res.status(200).json({status: 200, message: "OK"});
            }   
        });
    }
});

router.post("/login", sessionCheck, (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.status(500).json(err);
        }

        if (user) {
            isCorrectPassword(password, user.password)
                .then((result) =>{

                    if (result) {
                        req.session.user = username;
                        req.session.userId = user._id.toString();
                        res.status(200).json({status: 200, message: "OK"});
                    } else {
                        res.status(401).json({status: 401, message: "Invalid username or password"});
                    }
                });
        } else {
            //401: Unauthorized
            res.status(401).json({status: 401, message: "Invalid username or password"});
        }
    });
});

module.exports = router;
