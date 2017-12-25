document.addEventListener("DOMContentLoaded", function(event) {
  var currentTask = document.getElementById('current-task').innerText;

  //once task page is loaded, need to fetch the task daata from database

  console.log("current task: " + currentTask);

  //number of work intervals
  var count;
  //then need to setup clock

  //tracks work intervals completed to update database count
  var workIntervalsCompleted = 0;
  var workInterval = 25;

  var seconds = 0;
  var minutes = 0;
  var hours = 0;
  var clicked = false;
  var timer;

  fetch('/task/data/' + currentTask)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Error with Status Code: ' + response.status);
        return;
      }

      response.json().then(function(data) {
        console.log(data);
        minutes = workInterval * data.count;
        document.getElementById
      });
    });



  document.getElementById('start-button').addEventListener('click', function() {
    if (clicked === false) {
      timer = setInterval(function() {
        seconds++;
        if (seconds % 60 === 0) {
          minutes++;
          if (minutes === workInterval) {
            startBreak();
            clearInterval(timer);
            clicked = false;
          }
        }
        console.log(seconds);
      }, 1000);
    }
  });

  document.getElementById('stop-button').addEventListener('click', function() {
    if (clicked === false) {

    }
    else {
      clearInterval(timer);
      clicked = false;
    }
  });

  var startBreak = function() {
    var breakSeconds = 0;
    var breakMinutes = 0;

    var breakTimer = setInterval(function() {
      breakSeconds++;
    }, 1000);
  };
});
