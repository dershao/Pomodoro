var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var taskController = require('./controllers/taskController');
var homeController = require('./controllers/homeController');

//port numbere
const PORT = process.env.PORT || 5000;

//express app
var app = express();

//template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static("./public"));

app.use(session({
  secret: 'secret session',
  resave: false,
  saveUninitialized: false
}));

//fire controllers
taskController(app);
homeController(app);

//listen to port number
app.listen(PORT);
console.log("Listening to port %s...",  PORT);

/*Temporary for login page*/

app.get('/login', function(req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

app.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      }
      else {
        return res.redirect('/login');
      }
    });
  }
});
