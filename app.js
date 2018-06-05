const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const taskController = require('./controllers/taskController');
const homeController = require('./controllers/homeController');
const auth = require('./routes/authRouter.js');

/* requiring will run the code in the passport-(provider).js - we can now use authentication strategy 'google' */
const passportGoogle = require('./config/passport-google');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

//port number
const PORT = process.env.PORT || 5000;

//express app
const app = express();

//template engine
app.set('view engine', 'ejs');

// encrypt the cookie with a specify length of time
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //age of one day
    keys: [process.env.COOKIE_KEY]
}));

// initializes passport
app.use(passport.initialize());
app.use(passport.session());

//use static files at specified directory
app.use(express.static("./public"));

//use authentication routes
app.use('/auth', auth);

//fire controllers
taskController(app);
homeController(app);

//listen to port number
app.listen(PORT);
console.log("Listening to port %s...",  PORT);

//temporary location for this route
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});