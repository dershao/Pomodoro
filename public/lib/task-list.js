const DEFAULT_MINUTES = 25;
const DEFAULT_SECONDS = 0;
const DEFAULT_TOTAL_MILLISECONDS = 1500000; // 25 min * 60 seconds * 1000 milliseconds

var seconds = 0;
var minutes = 25;
var millisecondsTotal = 1500000;
var onTask = false;
var currentTask = "";
var workIntervals = 0;
var intervalsCompleted = 0;
var timer;
var currentProgress = 1;
var currentTaskId;
var progressList = new Map();

$(document).ready(function() {
  //when page is loaded, gather information on tasks, work intervals, and progress
  setup();

  $('form').on('submit', function() {
      $('form :submit')[0].disabled = true; 
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
        url: '/home/' + item,
        success: function(data) {
        
          location.reload();
        }
      });
  });

  $('.start-button').on('click', function() {

    //check if we're starting a new task or resuming a paused task
    if (currentTask === "" || $(this).closest('.task').find('.task-name').text() === currentTask) {

      currentTask = $(this).closest('.task').find('.task-name').text();
      currentTaskId = $(this).closest('.task').attr('id');

      if ($(this).text() === "Start Task") {
        $(this).html('Pause task');

        if (progressList.has(currentTask)) {
          minutes = Math.floor(Number(progressList.get(currentTask)) / 60000);
          seconds = Math.floor((Number(progressList.get(currentTask)) % 60000) / 1000);
          millisecondsTotal = progressList.get(currentTask);
          progressList.delete(currentTask);
        }

      } else {
        $(this).html('Start Task');

        progressList.set(currentTask, millisecondsTotal);

        let data = {timeRemaining: millisecondsTotal, currentTask: currentTask};
        $.ajax({
            type: 'POST',
            url: '/task/pause',
            data: data,
            success: function() {
              console.debug("Successfully made POST request to /pause");
            }
        });
      }

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
      
      const confirmTask = confirm("Starting a new task will reset the timer (your original progress will still be saved).");

      if (confirmTask == true) {

        $(this).html('Pause task');
        setupButtons(this);
        onTask = true;
        currentTask = $(this).closest('.task').find('.task-name').text();

        if (progressList.has(currentTask)) {
            minutes = Math.floor(Number(progressList.get(currentTask)) / 60000);
            seconds = Math.floor((Number(progressList.get(currentTask)) % 60000) / 1000);
            millisecondsTotal = progressList.get(currentTask);
            progressList.delete(currentTask);
        } else {
            minutes = DEFAULT_MINUTES;
            seconds = DEFAULT_SECONDS;
            millisecondsTotal = DEFAULT_TOTAL_MILLISECONDS;
        }
        setupTimer();
      }
    }
  });

  $('.closebtn').onclick = function() {

    var parent = this.parentElement; 
    
    parent.style.opacity = 0; 

    setTimeout(function() {
      div.style.display = "none";
    }, 600);
  }
});

function setup() {
  //when page is loaded, calculate the number of work intervals is needed
  fetch('/task')
    .then(function(res) {
      if (res.status !== 200) {
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
      document.getElementById('timer').innerHTML = minutes + ":0" + seconds;
    }
    else {
      document.getElementById('timer').innerHTML = minutes + ":" + seconds;
    }

    console.debug(millisecondsTotal);
    millisecondsTotal -= 1000;
  }, 1000);
}

function reset() {

  currentTask = "";
  currentTaskId = "";
  onTask = false;
  minutes = DEFAULT_MINUTES;
  seconds = DEFAULT_SECONDS;
  document.getElementById('timer').innerHTML = DEFAULT_MINUTES + ":0" + DEFAULT_SECONDS;
}

function setupButtons(button) {

  //get all start-task buttons
  var buttons = document.querySelectorAll('.start-button');

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] !== button) {

      //when a task is in progress, disable all other start task buttons
      if (buttons[i].disabled === true && buttons[i].innerHTML !== "Done") {
        buttons[i].disabled = false;
      } else {
        buttons[i].disabled = true;
      }
    }
  }
}

function resetButtons() {

  var buttons = document.querySelectorAll('.start-button');

  for (var i = 0; i < buttons.length; i++) {

    if (buttons[i].innerHTML !== "Done") {
      buttons[i].disabled = false;
      buttons[i].innerHTML = "Start Task";
    }
  }
}

function updateIntervalsCompleted() {

  $.ajax({
    type: 'PUT',
    url: '/task/' + currentTask,
    success: function(data) {
      intervalsCompleted++;
      updateProgressBar();
      resetButtons();
      if (data.complete === data.count) {
        setTaskAsDone(document.getElementById(currentTaskId));
      }
      progressList.delete(currentTask);
      reset();
      showNotification();
      playNotificationSound();
    }
  });
}

function updateProgressBar() {

  var progressElement = document.getElementById('progress');
  var newProgress = 1;

  if (workIntervals > 0) {
    newProgress = Math.floor(intervalsCompleted/workIntervals * 100);
  }

  var width = currentProgress;
  var increment = setInterval(function() {
    if (width >= newProgress) {
      clearInterval(increment);
    }
    else {
      width++;
      progressElement.style.width = width + '%';
    }
  }, 10);

  currentProgress = newProgress;
}

function setTaskAsDone(taskElement) {

  taskElement.style.backgroundColor = "rgb(179, 255, 179)";

  var finishedTaskStartButton = taskElement.querySelector('.start-button');
  finishedTaskStartButton.disabled = true;
  finishedTaskStartButton.innerHTML = "Done";
}

function showNotification() {
  
  var closeButton = document.getElementsByClassName('closebtn');

  closeButton[0].onclick = function() {

    var notification = this.parentElement;
    notification.style.opacity = "0";
    setTimeout(function() {
      notification.style.visibility = "hidden";
      clearTimeout(timeoutToInvisible);
    }, 600);
  }

  var notification = document.getElementsByClassName('notification');

  notification[0].style.visibility = "visible";

  var timeoutToInvisible = setTimeout(function() {
    notification[0].style.visibility = "hidden";
    notification[0].style.opacity = "0";
  }, 5000);
}

function playNotificationSound() {

  var notification = new Audio('../sounds/notification.m4a');
  notification.play();
}