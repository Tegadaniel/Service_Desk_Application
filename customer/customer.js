var chat = $.connection.chathub;
var customerData = JSON.parse(window.localStorage.getItem('user'))[0];
console.log((customerData))
var global;
chat.client.broadcastmessage = function (res) {
    //Html encode display name and message. 
    var data = JSON.parse(res);
    console.log(data)

    if (data.STATUS == 'SUCCESS') {
        if (data.ACTION_TYPE == "SELECT") {
            loadTemplate("optionTemplate", "select", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SELECT TABLE" || data.ACTION_TYPE == "FILTER TABLE") {
            loadTemplate("complainTemplate", "display", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SELECT STATUS") {
            loadTemplate("loadStatus", "selectStatus", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "CUSTOMER TABLE") {
            loadTemplate("chatTemplate", "chatDisplay", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT RATETABLE") {
            loadTemplate("ratingTemplate", "chatDisplay2", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT HISTORY") {
            loadTemplate("customerChatHistory", "customerViewChat", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT HISTORY") {
            loadTemplate("customerChatHistory2", "customerViewChat2", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT HISTORY") {
            loadTemplate("customerReopenChat", "customerReopen", data.OUTPUT)
        }

    }
};

//establish a connecttion to the hub.
$.connection.hub.start().done(function () {
    $('#submit').off("click").on("click", function () {
        var obj = JSON.stringify({
            SDA_BODY_TEXT: $('#textBody').val(),
            SDA_CATEGORY_ID: $('#select').val(),
            SDA_STATUS_ID: '1',
            SDA_CUSTOMER_ID: customerData.SDA_CUSTOMER_ID
        })
        $("#dataForm")[0].reset();
        chat.server.form_action(obj, 'INSERT');
        fetchTable();
        loadCustomerTable();

    });

    $('#logout').off("click").on("click", function () {
        window.localStorage.removeItem('user');

        if (customerData == null) {
            window.location.href = "/sda"
        }
    })

    $('.loggedname').html("Welcome: " + customerData.SDA_SUPPORT_NAME);

    $('#dashboard').off("click").on("click", function () {
        $('.dashboard').show();
        $('.Ratings').hide();
        $('.complaintHistory').hide();
        $('.chatHistory').hide();
    });
    $('#complaintHistory').off("click").on("click", function () {
        $('.dashboard').hide();
        $('.Ratings').hide();
        $('.complaintHistory').show();
        $('.chatHistory').hide();
    });
    $('#viewConvo').off("click").on("click", function () {
        $('.dashboard').hide();
        $('.Ratings').hide();
        $('.complaintHistory').hide();
        $('.chatHistory').show();
    });
    $('#Ratings').off("click").on("click", function () {
        $('.dashboard').hide();
        $('.Ratings').show();
        $('.complaintHistory').hide();
        $('.chatHistory').hide();
    });
    loadComplain();
    fetchTable();
    loadFilter();
    loadCustomerTable();
    loadCustomerRateTable();


});
function loadTemplate(template, display, data) {
    var templateText = $("#" + template).html();
    var tableTemplate = Handlebars.compile(templateText);
    $("#" + display).html(tableTemplate({ OUTPUT: data }))
}
function fetchTable() {
    var obj = JSON.stringify({
        SDA_CUSTOMER_ID: customerData.SDA_CUSTOMER_ID
    })
    chat.server.form_action(obj, 'SELECT TABLE');
}
//funtion for complaint 
function loadComplain() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'SELECT');
};
function loadFilter() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'SELECT STATUS');
}
function loadTable() {
    if ($('#selectStatus').val() == "All") {
        fetchTable();
    } else {
        var obj = JSON.stringify({
            SDA_STATUS_ID: $('#selectStatus').val(),
            SDA_CUSTOMER_ID: customerData.SDA_CUSTOMER_ID
        })
        chat.server.form_action(obj, 'FILTER TABLE');
    }
}
function loadCustomerTable() {
    var obj = JSON.stringify({
        SDA_CUSTOMER_ID: customerData.SDA_CUSTOMER_ID
    })
    chat.server.form_action(obj, 'CUSTOMER TABLE');
}
function loadCustomerRateTable() {
    var obj = JSON.stringify({
        SDA_CUSTOMER_ID: customerData.SDA_CUSTOMER_ID
    })
    chat.server.form_action(obj, 'SUPPORT RATETABLE');
}
function supportChatFunc(v) {
    global = v;
    var obj = JSON.stringify({
        SDA_BODY_ID: global
    })
    chat.server.form_action(obj, 'SUPPORT HISTORY');
}
function reOpenChat(l) {
    global = l;
    var obj = JSON.stringify({
        SDA_BODY_ID: global
    })
    chat.server.form_action(obj, 'SUPPORT HISTORY');
}
function customerReply() {
    if ($('#customerMessage').val() ==""){
        alert("Please enter a value!!!!!")
    }else{
        console.log(global)
        var obj = JSON.stringify({
            SDA_BODY_ID: global,
            SDA_CUSTOMER_ID: customerData.SDA_CUSTOMER_ID,
            SUPPORT_REPLY_BODY: $('#customerMessage').val(),
            SDA_BODY_TEXT: $('#customerMessage').val(),
        })
        alert("Complain gotten")
        $("#dataForm2")[0].reset();
        chat.server.form_action(obj, 'CUSTOMER RESPOND');
    }

}
function submitRating() {
    console.log(global + "in submit rating")
    var obj = JSON.stringify({
        SDA_BODY_ID: global,
        SDA_RATING_ID: $("input[name='rating']:checked").val()
    })
    alert("rating gotten")
    chat.server.form_action(obj, 'CUSTOMER RATING');
    loadCustomerRateTable()
}
function customerReplyReopen() {
    console.log(global + "in open chat")
    if ($('#customerMessage2').val() == ""){
        alert("Please enter required value")
    }else{
        var obj = JSON.stringify({
            SDA_BODY_ID: global,
            SDA_CUSTOMER_ID: customerData.SDA_CUSTOMER_ID,
            SUPPORT_REPLY_BODY: $('#customerMessage2').val(),
            SDA_BODY_TEXT:$('#customerMessage2').val(),
        })
        alert("Complain gotten and chat reopened")
        $("#dataForm3")[0].reset();
        chat.server.form_action(obj, 'CUSTOMER RESPOND');
    }

}