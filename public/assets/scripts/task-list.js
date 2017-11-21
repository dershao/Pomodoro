$(document).ready(function() {

  $('form').on('submit', function() {

      var item = $('form input');
      var task = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/',
        data: task,
        success: function(data) {

          location.reload();
        }
      });

      return false;
  });

  $('.task').on('click', function() {
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/' + item,
        success: function(data) {

          location.reload();
        }
      });
  });

});
