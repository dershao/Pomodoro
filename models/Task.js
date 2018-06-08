/**
 * Model for a Pomodoro task.
 */

var mongoose = require('mongoose');

//blueprint for Task model
var taskSchema = new mongoose.Schema({
    item: String,
    count: Number,
    complete: {type: Number, default: 0},
    timeRemaining: Number
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
