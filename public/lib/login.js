
$(document).ready(function() {

    $("#login-form").on("submit", function() {

        const username = $("#username");
        const password = $("#password");

        const userInfo = {
            username: username.val(),
            password: password.val(),
        }

        $.ajax({
            type: 'POST',
            url: '/auth/login',
            data: userInfo,
            success: function(data) {
                window.location.href = '/home';
            }
        });
        
        return false; 
    });
});