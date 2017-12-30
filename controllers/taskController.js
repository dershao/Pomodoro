var bodyParser = require('body-parser');
var Task = require('../models/Task');

//middleware for parsing urls
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

 //get all data for tasks
  app.get('/task', function(req, res) {
    Task.find({}, function(err, data) {
        if (err) throw err;
        if (data === null) {
          console.log("No tasks found.");
          return;
        }
        else {
          res.json(data);
        }
    });
  });

  //get all data on specific task
  app.get('/task/data/:item', function(req, res) {
    Task.findOne({'item': req.params.item}, function(err, data) {
      if (err) throw err;
      if (data == null) {
        console.log("No task found.");
        return;
      }
      else {
        res.json(data);
      }
    });
  });

  app.put('/task/:item', urlencodedParser, function(req, res) {
    Task.findOneAndUpdate({item: req.params.item}, {$inc: {complete: 1} }, {new: true}, function(err, data) {
      if (err) {
        res.status(500);
        console.log("Something went wrong when updating database");
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
