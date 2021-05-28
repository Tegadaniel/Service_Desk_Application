var chat = $.connection.chathub;
chat.client.broadcastmessage = function (res) {
    //Html encode display name and message. 
    console.log(res)
    var data = JSON.parse(res);
    console.log(data)



    if (data.STATUS == 'ERROR') {
        alert('Big Error')
    } else {
        alert("Authentication Successful!");
        console.log("DATA AFTER LOGIN" + data);
        window.localStorage.setItem('user', JSON.stringify(data.OUTPUT));
        console.log(data.OUTPUT)
        var url = data.OUTPUT[0].SDA_SUPPORT_TYPE.toLowerCase();
        window.location.href = `${url}/${url}.aspx`
    }

};

//establish a connecttion to the hub.
$.connection.hub.start().done(function () {
    $('.btn').off("click").on("click", function () {
        if ($('#email').val() == "" || $('#password').val() == "") {
            alert("Enter required value")
        }
        var obj = JSON.stringify({
            SDA_SUPPORT_EMAIL: $('#email').val(),
            SDA_SUPPORT_PASSWORD: $('#password').val()
        })

        chat.server.form_action(obj, 'LOGIN');
    })


});

