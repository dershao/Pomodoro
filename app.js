var express = require('express');
var mongoose = require('mongoose');
var taskController = require('./controllers/taskController');
var homeController = require('./controllers/homeController');

//port number
const PORT = process.env.PORT || 5000;

//express app
var app = express();

//template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static("./public"));

//fire controllers
taskController(app);
homeController(app);

//listen to port number
app.listen(PORT);
console.log("Listening to port %s...",  PORT);
