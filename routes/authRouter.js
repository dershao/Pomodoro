/**
 * Router for all Passport authentication.
 */

const router = require('express').Router();
const passport = require('passport');


//auth logout
router.get('/logout', function(req, res) {
	
	res.send('logging out');
});


//auth with gogole
//passport.authenticate('google') - specify what authentication strategy we wish to use
router.get('/google', passport.authenticate('google', {
	scope: ['profile']
}));

//callback url to redirect after authentication is finished
//after authentication, we have a code provided by google which can be exchange for profile information
//since code is present, we no longer need to load consent screen
router.get('/google/redirect', passport.authenticate('google'), function(req, res) {
	res.send('Callback URL');
});


module.exports = router;
