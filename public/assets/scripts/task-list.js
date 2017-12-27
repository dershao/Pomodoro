$(document).ready(function() {

  var onTask = false;
  var currentTask = "";
  var seconds = 5;
  var minutes = 0;
  var workIntervals = 0;
  var intervalsCompleted = 0;
  var timer;

  //when page is loaded, calculate the number of work intervals is needed
  fetch('/task')
    .then(function(res) {
      if (res.status !== 200) {
        console.log("error");
        return;
      }
      res.json().then(function(data) {
        for (var i = 0; i < data.length; i++) {
          workIntervals = workIntervals + data[i].count;
        }
      });
    });

  $('form').on('submit', function() {

      var item = $('#task-input');
      var count = $('#time-input');
      var task = {item: item.val(), count: count.val()};

      $.ajax({
        type: 'POST',
        url: '/',
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

    //get all start-task buttons
    var buttons = document.querySelectorAll('.start-button');

    //change the text of the current button when clicked
    $(this).text() === "Start Task" ? $(this).html('Stop Task') : $(this).html('Start Task');


    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i] !== this) {

        //when a task is in progress, disable all other start task buttons
        buttons[i].disabled === true ? buttons[i].disabled = false : buttons[i].disabled = true;
      }
    }

    onTask === true ? onTask = false : onTask = true;

    if (onTask === true) {

      currentTask = $(this).closest('.task').find('.task-name').text();

      var workIntervalsRequired = 0;

      fetch('/task/data/' + currentTask)
        .then(function(res) {
          if (res.status !== 200) {
            console.log('Error with status code: ' + res.status);
            return;
          }
          res.json().then(function(data) {
            workIntervalsRequired = data.count;

              timer = setInterval(function() {

                if (seconds === 0 && minutes === 0) {
                  clearInterval(timer);
                  intervalsCompleted++;

                  if (intervalsCompleted === workIntervalsRequired) {
                    console.log(currentTask  + " is completed!");
                  }
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
          });
        });
    }
    else {
      clearInterval(timer);
      minutes = 25;
      seconds = 0;
    }
  });
});
