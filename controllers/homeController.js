var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Task = require('../models/Task');

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}

mongoose.connect(process.env.MONGO_DB, {
  useMongoClient: true
});

mongoose.Promise = require('bluebird');

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  //home page, displays all tasks currently stored
  app.get('/home', function(req, res) {
    Task.find({}, function(err, data) {
      if (err) throw err;
      res.render('home', {tasks: data});
    });
  });

  //get new task and store in it database
  app.post('/home', urlencodedParser, function(req, res) {
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
}
