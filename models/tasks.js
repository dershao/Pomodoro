var mongoose =  require('mongoose');

mongoose.connect("mongodb://admin:admin>@ds229295.mlab.com:29295/taskstorage", {
  useMongoClient: true;
});

var taskSchema = new mongoose.Schema({
  item: String,
  count: Number
});
