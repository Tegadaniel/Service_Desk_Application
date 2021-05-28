var chat = $.connection.chathub;
var supportData = JSON.parse(window.localStorage.getItem('user'))[0];
var body_Id;
console.log(supportData)
chat.client.broadcastmessage = function (res) {
    //Html encode display name and message. 
    // console.log(res)
    var data = JSON.parse(res);
    console.log(data)
    if (data.STATUS == 'SUCCESS') {
        if (data.ACTION_TYPE == "SUPPORT REQUEST" || data.ACTION_TYPE == "SUPPORT FILTER") {
            loadTemplate("requestTemplate", "displayRequest", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SELECT COMPLAINT") {
            loadTemplate("supportReplyTemp", "supportReply", data.OUTPUT[0])
        }
        if (data.ACTION_TYPE == "SUPPORT CATEGORY" || data.ACTION_TYPE == " SUPPORT CATEGORYCHANGED") {
            loadTemplate("supportChangeTable", "supportChange", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT CLOSE") {
            loadTemplate("supportCloseRequest", "supportCloseReq", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT CHANGECATEGORY" || data.ACTION_TYPE == "SUPPORT CHANGE") {
            loadTemplate("supportChangeCategory", "select", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT STATUS") {
            loadTemplate("loadStatus", "selectStatus", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT CHAT") {
            loadTemplate("viewChat", "displayChat", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT HISTORY") {
            loadTemplate("supportChatHistory", "supportViewChat", data.OUTPUT)
        }

    }
};

//establish a connecttion to the hub.
$.connection.hub.start().done(function () {
    fetchTable();
    fetchResponseTable();
    fetchChangeCategory();
    supportClose();
    loadFilter();
    loadChat();

    $('.loggedname').html("Welcome: " + supportData.SDA_SUPPORT_NAME);



    $('#logout').off("click").on("click", function () {
        window.localStorage.removeItem('user');

        if (supportData == null) {
            window.location.href = "/sda"
        }
    })



    $('#supportView').off("click").on("click", function () {
        $('.supportView').show();
        $('.escalate').hide();
        $('.changeCategory').hide();
        $('.closeRequest').hide();
        $('.viewConvo').hide();
    });

    $('#escalate').off("click").on("click", function () {
        $('.supportView').hide();
        $('.escalate').show();
        $('.changeCategory').hide();
        $('.closeRequest').hide();
        $('.viewConvo').hide();
    });

    $('#changeCategory').off("click").on("click", function () {
        $('.supportView').hide();
        $('.escalate').hide();
        $('.changeCategory').show();
        $('.closeRequest').hide();
        $('.viewConvo').hide();
    });


    $('#closeRequest').off("click").on("click", function () {
        $('.supportView').hide();
        $('.escalate').hide();
        $('.changeCategory').hide();
        $('.closeRequest').show();
        $('.viewConvo').hide();
    });

    $('#viewConvo').off("click").on("click", function () {
        $('.supportView').hide();
        $('.escalate').hide();
        $('.changeCategory').hide();
        $('.closeRequest').hide();
        $('.viewConvo').show();
    });
});







function loadTemplate(template, display, data) {
    var templateText = $("#" + template).html();
    var tableTemplate = Handlebars.compile(templateText);
    $("#" + display).html(tableTemplate({ OUTPUT: data }))
}


function changeComplainStatus(D) {
    console.log(D)
    alert('Category Changed!!')
    var obj = JSON.stringify({
        SDA_BODY_ID: D
    })
    chat.server.form_action(obj, 'SUPPORT CHANGE');
}
function fetchTable() {
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID
    })
    chat.server.form_action(obj, 'SUPPORT REQUEST');
}
function fetchResponseTable() {
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID,
        SDA_STATUS_ID: '1'
    })
    chat.server.form_action(obj, 'SUPPORT RESPOND');
}
function fetchReply() {
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID,
        SDA_STATUS_ID: '1'
    })
    chat.server.form_action(obj, 'SUPPORT REPLY');
}
function fetchCustomerMesssage(s) {
    console.log(s)
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID,
        SDA_BODY_ID: s
    })
    console.log("Obj checking: " + obj)
    chat.server.form_action(obj, 'SELECT COMPLAINT');
}
function fetchChangeCategory() {
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID,
    })
    chat.server.form_action(obj, 'SUPPORT CATEGORY');
}
function supportClose() {
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID,
    })
    chat.server.form_action(obj, 'SUPPORT CLOSE');
    // alert("Conversation Closed!")
}
function supportResponding(f) {
    if ($('#textBody').val() == "") {
        alert("enter a reply")
    } else {
        var obj = JSON.stringify({
            SDA_CUSTOMER_ID: supportData.SDA_CUSTOMER_ID,
            SDA_SUPPORT_ID: supportData.SDA_SUPPORT_ID,
            SUPPORT_REPLY_BODY: $('#textBody').val(),
            SDA_BODY_ID: f
        })
        alert("Respond sent!!!")
        $("#dataForm2")[0].reset();
        chat.server.form_action(obj, 'SUPPORT RESPOND');
        fetchTable() 
    }
}
function changeSupportCategory(Q) {
    body_Id = Q;
    console.log(body_Id)
    var obj = JSON.stringify({
    })
    chat.server.form_action(obj, 'SUPPORT CHANGECATEGORY');
}
function confirmCategory() {
    console.log(body_Id)
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: $('#select').val(),
        SDA_BODY_ID: body_Id
    })
    alert("Category Changed!!!!")
    chat.server.form_action(obj, 'SUPPORT CATEGORYCHANGED');
    fetchChangeCategory();
}
function supportConvo() {
    var obj = JSON.stringify({
    })
    chat.server.form_action(obj, 'SUPPORT RESPOND');
}
function loadFilter() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'SUPPORT STATUS');
}
function loadTable() {
    if ($('#selectStatus').val() == "ALL") {
        fetchTable();
    } else {
        var obj = JSON.stringify({
            SDA_STATUS_ID: $('#selectStatus').val(),
            SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID
        })
        chat.server.form_action(obj, 'SUPPORT FILTER');
    }
}
function loadChat() {
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: supportData.SDA_CATEGORY_ID
    })
    chat.server.form_action(obj, 'SUPPORT CHAT');
}
function supportChatFunc(v) {
    body_Id = v;
    var obj = JSON.stringify({
        SDA_BODY_ID: v
    })
    chat.server.form_action(obj, 'SUPPORT HISTORY');
}

function supportChatting() {
    console.log("BodyId is: "+ body_Id + " Inside the supportChatting")
    if ($('#adminMessage').val() == "") {
        alert("enter a reply")
    } else {
        var obj = JSON.stringify({
            SDA_CUSTOMER_ID: supportData.SDA_CUSTOMER_ID,
            SDA_SUPPORT_ID: supportData.SDA_SUPPORT_ID,
            SUPPORT_REPLY_BODY: $('#adminMessage').val(),
            SDA_BODY_ID: body_Id
        })
        alert("Complain gotten")
        $("#dataForm2")[0].reset();
        chat.server.form_action(obj, 'SUPPORT RESPOND');
    }
}