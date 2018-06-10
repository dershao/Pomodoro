$(document).ready(function() {

    $('#registration-form').on('submit', function() {
        console.log("button was pressed");
        
        let username = $('#username');
        let password = $('#password');
        let confirm = $('#confirm');

        if (password.val() !== confirm.val()) {
            alert("Error: Passwords don't match.");
            return false; 
        }

        let userInfo = {
            username: username.val(),
            password: password.val()
        }

        $.ajax({
            type: 'POST',
            url: '/user/register',
            data: userInfo,
            dataType: 'json',
            success: function(data) {
                alert("successfully posted some data");
            }
        });

        return false;
    });
});