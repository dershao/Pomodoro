$(document).ready(function() {

    $('#delete-button').on('click', function() {
        
        var item = $('current-task').text();
        
        $.ajax({
            type: 'DELETE',
            url: '/task/' + item,
            success: function(data) {
                //do something
            }
        });
        
        confirm("Are you sure you want to delete this?");
    });
});