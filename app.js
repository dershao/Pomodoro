const express = require('express');
const mongoose = require('mongoose');
const taskController = require('./controllers/taskController');
const homeController = require('./controllers/homeController');
const auth = require('./routes/authRouter.js');

/* requiring will run the code in the passport-setup.js - we can now use authentication strategy 'google' */
const passportSetup = require('./config/passport-setup');

//port number
const PORT = process.env.PORT || 5000;

//express app
const app = express();

//template engine
app.set('view engine', 'ejs');

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
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/views/register.html');
});