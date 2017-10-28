var mongoose = require('mongoose');

//blueprint for Task model
var taskSchema = new mongoose.Schema({
    item: String,
    count: Number
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
