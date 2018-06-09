const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authCheck = require('../middlewares/authCheck');
const router = require('express').Router();
const Task = require('../models/Task');

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}

mongoose.connect(process.env.MONGO_DB, {
  useMongoClient: true
});

mongoose.Promise = require('bluebird');

const urlencodedParser = bodyParser.urlencoded({extended: false});

//home page, displays all tasks currently stored
router.get('/', authCheck, function(req, res) {
  Task.find({}, function(err, data) {
    if (err) throw err;
    res.render('home', {tasks: data});
  });
});

//get new task and store in it database
router.post('/', authCheck, urlencodedParser, function(req, res) {
  var newTask = Task(req.body).save(function(err, data) {
    if (err) throw err;
    res.json(data);
  })
});

//deletes selected task
router.delete('/:item', authCheck, function(req, res) {
  Task.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

module.exports = router;