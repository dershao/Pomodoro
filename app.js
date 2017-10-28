var express = require('express');
var taskController = require('./controllers/taskController');

//express app
var app = express();

//template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static("./public"));

//fire controllers
taskController(app);

//listen to port number
app.listen(5000);
console.log("Listening to port 5000...");
