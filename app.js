var express = require('express');
var tasksController = require('./controllers/tasksController')

//express app
var app = express();

app.use(express.static("./public"));

app.set('view engine', 'ejs');

//listen to port number
app.listen(3000);
console.log("Listening to port 3000...");

//fire controllers
tasksController(app);

