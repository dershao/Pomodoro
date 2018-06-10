if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

//port number
const PORT = process.env.PORT || 5000;

//express app
const app = express();

//template engine
app.set('view engine', 'ejs');

//encrypt the cookie with a specify length of time
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //age of one day
    keys: [process.env.COOKIE_KEY]
}));

//initializes passport
app.use(passport.initialize());
app.use(passport.session());

//use static files at specified directory
app.use(express.static("./public"));
app.use('/', require('./controllers'));

//listen to port number
app.listen(PORT);
console.log("Listening to port %s...",  PORT);
