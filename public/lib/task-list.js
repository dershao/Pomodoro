const DEFAULT_MINUTES = 25;
const DEFAULT_SECONDS = 0;

var seconds = 0;
var minutes = 25;
var onTask = false;
var currentTask = "";
var workIntervals = 0;
var intervalsCompleted = 0;
var timer;

$(document).ready(function() {

  //when page is loaded, gather information on tasks, work intervals, and progress
  setup();

  $('form').on('submit', function() {

      var item = $('#task-input');
      var count = $('#time-input');
      var task = {item: item.val(), count: count.val()};

      $.ajax({
        type: 'POST',
        url: '/home',
        data: task,
        success: function(data) {

          location.reload();

          //resets form to original placeholder text
          document.getElementById('task-input').value = '';
          document.getElementById('time-input').value = '';
        }
      });
      return false;
  });

  $('.task-name').on('click', function() {
      var item = $(this).text().replace(/ /g, '-');
      $.ajax({
        type: 'DELETE',
        url: '/' + item,
        success: function(data) {

          location.reload();
        }
      });
  });

  $('.start-button').on('click', function() {

    console.log("intervals completed: " + intervalsCompleted);
    console.log("work intervals: " + workIntervals);

    //check if we're starting a new task or resuming a paused task
    if (currentTask === "" || $(this).closest('.task').find('.task-name').text()) {

      //change the text of the current button when clicked
      $(this).text() === "Start Task" ? $(this).html('Pause task') : $(this).html('Start Task');

      setupButtons(this);

      onTask === true ? onTask = false : onTask = true;

      if (onTask === true) {
        setupTimer();
      }
      else {
        clearInterval(timer);
      }
    }
    else {
      
      var confirmTask = confirm("Starting a new task will reset the timer (your original progress will still be saved).");
      
      if (confirmTask == true) {

        currentTask = $(this).closest('.task').find('.task-name').text();
        $(this).html('Pause task');
        setupButtons(this);
        onTask = true;
        setupTimer();
        minutes = DEFAULT_MINUTES;
        seconds = DEFAULT_SECONDS;
      }
    }
  });
});

function setup() {

  //when page is loaded, calculate the number of work intervals is needed
  fetch('/task')
    .then(function(res) {
      if (res.status !== 200) {
        console.log("error");
        return;
      }
      res.json().then(function(data) {
        for (var i = 0; i < data.length; i++) {
          workIntervals += data[i].count;
          intervalsCompleted += data[i].complete;
        }
        updateProgressBar();
      });
    });

}

function setupTimer() {

  timer = setInterval(function() {

    if (seconds === 0 && minutes === 0) {
      clearInterval(timer);
      updateIntervalsCompleted();
    }

    if (seconds === 0) {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
      }
    }
    else {
      seconds--;
    }

    if (seconds < 10) {
      document.getElementById('timer').innerHTML = minutes + ":" + "0" + seconds;
    }
    else {
      document.getElementById('timer').innerHTML = minutes + ":" + seconds;
    }
  }, 1000);
}

function setupButtons(button) {

  //get all start-task buttons
  var buttons = document.querySelectorAll('.start-button');

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] !== button) {

      //when a task is in progress, disable all other start task buttons
      buttons[i].disabled === true ? buttons[i].disabled = false : buttons[i].disabled = true;
    }
  }
}

function updateIntervalsCompleted() {

  var currentIntervalsCompleted;
  var workIntervalsRequired;

  $.ajax({
    type: 'PUT',
    url: '/task/' + currentTask,
    success: function(data) {
      currentIntervalsCompleted = data.complete;
      workIntervalsRequired = data.count;
      location.reload();
    }
  });
}

function updateProgressBar() {

  var progressElement = document.getElementById('progress');
  var progress = 1;

  if (workIntervals > 0) {
    var progress = Math.floor(intervalsCompleted/workIntervals * 100);
  }

  var width = 1;
  var increment = setInterval(function() {
    if (width >= progress) {
      clearInterval(increment);
    }
    else {
      width++;
      progressElement.style.width = width + '%';
    }
  }, 10);
}
