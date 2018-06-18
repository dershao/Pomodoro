const bodyParser = require('body-parser');
const authCheck = require('../middlewares/authCheck');
const router = require('express').Router();
const Task = require('../models/Task');

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}

const urlencodedParser = bodyParser.urlencoded({extended: false});

//home page, displays all tasks currently stored
router.get('/', authCheck, function(req, res) {
  Task.find({userId: req.session.userId || req.session.passport.user}, function(err, data) {
    if (err) throw err;
    res.render('home', {tasks: data});
  });
});

//get new task and store in it database
router.post('/', authCheck, urlencodedParser, function(req, res) {

  const userId = req._passport ? req._passport.session.user : req.session.userId;

  const newTask = {
    item: req.body.item,
    count: req.body.count,
    userId: userId,
  };

  var makeNewTask = Task(newTask).save(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

//deletes selected task
router.delete('/:item', authCheck, function(req, res) {
  Task.find({item: req.params.item.replace(/\-/g, " "), userId: req.session.userId || req._passport.session.user}).remove(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

module.exports = router;