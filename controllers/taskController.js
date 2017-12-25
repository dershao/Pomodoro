var bodyParser = require('body-parser');
var Task = require('../models/Task');

//middleware for parsing urls
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

//  home page, displays all tasks currently stored
  app.get('/task/:item', function(req, res) {
    Task.findOne({'item': req.params.item}, function(err, data) {
        if (err) throw err;
        if (data === null) {
          res.status(404);
          res.send('No task found named: ' + req.params.item);
        }
        else {
          res.render('tasks', {task: data.item});
        }
    });
  });

  app.get('/task/data/:item', function(req, res) {
    Task.findOne({'item': req.params.item}, function(err, data) {
      if (err) throw err;
      if (data == null) {
        return;
      }
      else {
        res.json(data);
      }
    });
  });

  app.delete('/task/:item', function(req, res) {
    Task.find({item: req.params.item.replace(/\-/g, " ")})
      .remove(function(err, data) {
        if (err) throw err;
        res.send("Task deleted.");
      });
  });
};
