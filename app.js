var express = require('express');
var mongoose = require('mongoose');
var taskController = require('./controllers/taskController');
var homeController = require('./controllers/homeController');



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
app.listen(5000);
console.log("Listening to port 5000...");
