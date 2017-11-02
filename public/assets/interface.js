$(document).ready(function() {

  $("#start").on('click', function() {

      $("#navbar").css('background-color', '#FF2400');
      $("#tasks").css('background-color', '#F08080');
      $("#clock").css('background-color', '#F08080');
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
