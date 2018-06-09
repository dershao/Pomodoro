var router = require('express').Router();
var bodyParser = require('body-parser');
var Task = require('../models/Task');

//middleware for parsing urls
var urlencodedParser = bodyParser.urlencoded({extended: false});

//get all data for tasks
router.get('/', (req, res) => {
  Task.find({}, (err, data) => {
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
router.get('/data/:item', (req, res) => {
  Task.findOne({'item': req.params.item}, (err, data) => {
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

router.put('/:item', urlencodedParser, (req, res) => {
  Task.findOneAndUpdate({item: req.params.item}, {$inc: {complete: 1} }, {new: true}, (err, data) => {
    if (err) {
      res.status(500);
      console.log("Something went wrong when updating database");
    }
    else {
      res.json(data);
    }
  });
});

router.delete('/:item', (req, res) => {
  Task.find({item: req.params.item.replace(/\-/g, " ")})
    .remove(function(err, data) {
      if (err) throw err;
      res.send("Task deleted.");
    });
});

module.exports = router;