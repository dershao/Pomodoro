$(document).ready(function() {

  var onTask = false;

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
          document.getElementById('task-input').value = "";
          document.getElementById('time-input').value = "";
        }
      });
      return false;
  });

  $('.task-name').on('click', function() {
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/' + item,
        success: function(data) {

          location.reload();
        }
      });
  });

  $('.start-button').on('click', function() {

    var buttons = document.querySelectorAll('.start-button');

    if (onTask === false) {

      $(this).html("Stop Task");

      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] !== this) {
          //prevent other tasks from starting while current task is on
          buttons[i].disabled = true;
        }
      }

      onTask = true;
    }
    else {

      $(this).html("Start Task");

      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] !== this) {
          //re-enable all other start tasks
          buttons[i].disabled = false;
        }
      }
      onTask = false;
    }
  });
});
