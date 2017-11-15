var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Task = require('../models/Task');

//middleware for parsing urls
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

//  home page, displays all tasks currently stored
  app.get('/task/:item', function(req, res) {
    res.render('tasks', {tasks: req.params.item});
  });

  //get new task and store in it database
  app.post('/task', urlencodedParser, function(req, res) {
    var newTask = Task(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });
};
