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
          res.send('404: Not Found');
        }
        else {
          res.render('tasks', {task: req.params.item});
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
