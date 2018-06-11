const router = require('express').Router();
const bodyParser = require('body-parser');
const Task = require('../models/Task');
const authCheck = require('../middlewares/authCheck');

//middleware for parsing urls
const urlencodedParser = bodyParser.urlencoded({extended: false});

//get all data for tasks
router.get('/', authCheck, (req, res) => {
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
router.get('/data/:item', authCheck, (req, res) => {
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

router.put('/:item', authCheck, urlencodedParser, (req, res) => {
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

router.delete('/:item', authCheck, (req, res) => {
  Task.find({item: req.params.item.replace(/\-/g, " ")})
    .remove(function(err, data) {
      if (err) throw err;
      res.send("Task deleted.");
    });
});

module.exports = router;