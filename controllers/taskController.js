var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('../models/Task');

mongoose.connect('mongodb://admin:admin@ds237855.mlab.com:37855/tasklist');

//middleware for parsing urls
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  //home page, displays all tasks currently stored
  app.get('/', function(req, res) {
    Task.find({}, function(err, data) {
      if (err) throw err;
      res.render('tasks', {tasks: data});
    });
  });

  //get new task and store in it database
  app.post('/', urlencodedParser, function(req, res) {
    var newTask = Task(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

  //deletes selected task
  app.delete('/:item' , function(req, res) {
    Task.find({item: req.params.item.replace(/\-/g, " ")})
      .remove(function(err, data) {
        if (err) throw err;
        res.json(data);
    });
  });
};
