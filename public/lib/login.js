$(document).ready(function() {

    $("#login-form").on("submit", function() {

        const username = $("#username");
        const password = $("#password");

        const userInfo = {
            username: username.val(),
            password: password.val(),
        };

        $.ajax({
            type: "POST",
            url: "/auth/login",
            data: userInfo,
            dataType: "json",
            complete: function(xhr, exception) {
                console.debug(xhr);
                if (xhr.responseJSON.status === 200) {
                    window.location.href = "/home";
                } else if (xhr.responseJSON.status === 401) {
                    document.getElementById("status-message").innerHTML = xhr.responseJSON.message;
                }
            }
        });
        
        return false; 
    });
});