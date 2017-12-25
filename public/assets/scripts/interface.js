$(document).ready(function() {

  $("#start-button").on('click', function() {

      $("#navbar").css('background-color', '#000000');
      $("#container").css('background-color', '#585858');
      $(".task").css('background-color', '#585858');
  });

  $("#stop").on('click', function() {

    $("#navbar").css('background-color', '#E6D7AE');
    $("#tasks").css('background-color', '#EAE4D4');
    $("#clock").css('background-color', '#EAE4D4');
  });

  //when break
  // $("#navbar").css('background-color', '#63D13E')
  // $("#tasks").css('background-color', '#90EE90');
  // $("#clock").css('background-color', '#90EE90');

});
