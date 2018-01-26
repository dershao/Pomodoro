var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Task = require('../models/Task');

/*Temporary for testing users*/
//var User = require('../models/User');

mongoose.connect('mongodb://admin:admin@ds237855.mlab.com:37855/tasklist', {
  useMongoClient: true
});

mongoose.Promise = require('bluebird');

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  //home page, displays all tasks currently stored
  app.get('/', function(req, res) {
    Task.find({}, function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

  //get new task and store in it database
  app.post('/', urlencodedParser, function(req, res) {
    var newTask = Task(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

  //deletes selected task
  app.delete('/:item', function(req, res) {
    Task.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  /*Temporary: testing register users*/
  app.post('/register', urlencodedParser, function(req, res) {
    console.log("we posting now.")
    var userData = {
      username: req.body.username,
      password: req.body.password
    }

    console.log(userData);

    User(req.body).save(function(err, data) {
      if (err) throw err;
      res.redirect('/');
    });
  });
}
