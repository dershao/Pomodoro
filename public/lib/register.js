$(document).ready(function() {

    $('#registration-form').on('submit', function() {
        
        const username = $('#username');
        const password = $('#password');
        const confirm = $('#confirm');

        if (password.val() !== confirm.val()) {
            alert("Error: Passwords don't match.");
            return false; 
        }

        let userInfo = {
            username: username.val(),
            password: password.val()
        };

        $.ajax({
            type: 'POST',
            url: '/auth/register',
            data: userInfo,
            dataType: "json",
            complete: function(xhr, exception) {

                if (xhr.status === 200) {
                    window.location.href = "/home";
                } else if (xhr.status === 500 && xhr.responseJSON.code === 11000) {
                    document.getElementById("status-message").innerHTML = `User ${userInfo.username} already exists.`;
                }
            }
        });

        return false;
    });
});