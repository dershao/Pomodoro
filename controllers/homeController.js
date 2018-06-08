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



const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  const authCheck = (req, res, next) => {
    if (!req.user) {
      console.log("no user");
      res.redirect('/login');
    } else {
      console.log(req.user);
      console.log("some user");
      next();
    }
  };

  //home page, displays all tasks currently stored
  app.get('/home', authCheck, function(req, res) {
    Task.find({}, function(err, data) {
      if (err) throw err;
      res.render('home', {tasks: data});
    });
  });

  //get new task and store in it database
  app.post('/home', authCheck, urlencodedParser, function(req, res) {
    var newTask = Task(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

  //deletes selected task
  app.delete('/:item', authCheck, function(req, res) {
    Task.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}
