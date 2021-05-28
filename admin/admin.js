var chat = $.connection.chathub;
var adminData = JSON.parse(window.localStorage.getItem('user'))[0];
console.log(adminData)
var global;
chat.client.broadcastmessage = function (res) {
    //Html encode display name and message. 
    var data = JSON.parse(res);
    console.log(data)
    if (data.STATUS == 'SUCCESS') {
        if (data.ACTION_TYPE == "SELECT ROLE") {
            loadTemplate("roleTemplate", "select", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "ADMIN TABLE" || data.ACTION_TYPE == "ADMIN SEARCH") {
            loadTemplate("viewChat", "display", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "FETCH ROLE") {
            loadTemplate("deleteTemplate", "displayRole", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "FETCH CATEGORIES") {
            loadTemplate("fetchCat", "displayCat", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SELECT") {
            loadTemplate("loadStatus", "selectStatus", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT HISTORY") {
            loadTemplate("supportChatHistory", "supportViewChat", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "ADMIN CLOSE") {
            loadTemplate("adminCloseRequest", "adminCloseReq", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "ADMIN DASHBOARD") {
            loadTemplate("adminDash2", "displayResult2", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "ADMIN DASHBOARD2") {
            loadTemplate("adminDash1", "displayResult1", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "CUSTOMER PROFILE") {
            loadTemplate("viewCustomerProfile", "displayCustomerProfile", data.OUTPUT)
        }
        if (data.ACTION_TYPE == "SUPPORT PROFILE") {
            loadTemplate("viewSupportProfile", "adminProfiler", data.OUTPUT)
        }

    }
};

//establish a connecttion to the hub.
$.connection.hub.start().done(function () {
    $('#submitBtn').off("click").on("click", function () {
        var obj = JSON.stringify({
            SDA_SUPPORT_NAME: $('#name').val(),
            SDA_SUPPORT_PASSWORD: $('#password').val(),
            SDA_SUPPORT_EMAIL: $('#email').val(),
            SDA_ROLE_ID: $('#select').val(),
            SDA_CATEGORY_ID: $('#selectStatus').val()
        })
        console.log(obj)
        $(".dataForm")[0].reset();
        chat.server.form_action(obj, 'INSERT ROLE')
        fetchData();

    });
    $('.loggedname').html("Welcome: " + adminData.SDA_SUPPORT_NAME);

    $('.submitBtn').off("click").on("click", function () {
        var obj = JSON.stringify({
            SDA_CATEGORY_NAME: $('#category').val()
        })
        $("#dataForm")[0].reset();
        chat.server.form_action(obj, 'INSERT CATEGORY')
        loadCategory();

    });
    $('#searchAdmin').off("click").on("click", function () {
        var obj = JSON.stringify({
            SDA_CUSTOMER_EMAIL: $('#adminSearch').val()
        })
        $("#form")[0].reset();
        chat.server.form_action(obj, 'ADMIN SEARCH')

    });

    $('#viewRequest').off("click").on("click", function () {
        $('.viewRequest').show();
        $('.assignRole').hide();
        $('.manageRole').hide();
        $('.userCategories').hide();
        $('.dashboard').hide();
        $('.closeAdminRequest').hide();
    });
    $('#assignRole').off("click").on("click", function () {
        $('.viewRequest').hide();
        $('.assignRole').show();
        $('.manageRole').hide();
        $('.userCategories').hide();
        $('.dashboard').hide();
        $('.closeAdminRequest').hide();
    });
    $('#manageRole').off("click").on("click", function () {
        $('.viewRequest').hide();
        $('.assignRole').hide();
        $('.manageRole').show();
        $('.userCategories').hide();
        $('.dashboard').hide();
        $('.closeAdminRequest').hide();
    });
    $('#userCategories').off("click").on("click", function () {
        $('.viewRequest').hide();
        $('.assignRole').hide();
        $('.manageRole').hide();
        $('.userCategories').show();
        $('.dashboard').hide();
        $('.closeAdminRequest').hide();
    });
    $('#dashboard').off("click").on("click", function () {
        $('.dashboard').show();
        $('.viewRequest').hide();
        $('.assignRole').hide();
        $('.manageRole').hide();
        $('.userCategories').hide();
        $('.closeAdminRequest').hide();
    });
    $('#closeAdminRequest').off("click").on("click", function () {
        $('.dashboard').hide();
        $('.viewRequest').hide();
        $('.assignRole').hide();
        $('.manageRole').hide();
        $('.userCategories').hide();
        $('.closeAdminRequest').show();
    });

    $('#logout').off("click").on("click", function () {
        window.localStorage.removeItem('user');

        if (adminData == null) {
            window.location.href = "/sda"
        }
    })



    fetchTable();
    loadSupport();
    fetchData();
    loadCategory();
    loadFilter();
    deleteInfo();
    deleteCategory();
    adminClose();
    AdminCheck();
    AdminCheck2();

});


function loadTemplate(template, display, data) {
    var templateText = $("#" + template).html();
    var tableTemplate = Handlebars.compile(templateText);
    $("#" + display).html(tableTemplate({ OUTPUT: data }))
}



function fetchTable() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'ADMIN TABLE');
}
function loadSupport() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'SELECT ROLE')
};
function fetchData() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'FETCH ROLE')
}
function loadCategory() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'FETCH CATEGORIES')
}
function loadFilter() {
    var obj = JSON.stringify({})
    chat.server.form_action(obj, 'SELECT');
}
function deleteInfo(D) {
    var user_id = $(this).data("id");
    console.log("support ID: " + user_id)
    $(`[data-id='${D}']`).closest('tr').remove();
    var obj = JSON.stringify({
        SDA_SUPPORT_ID: D
    })
    chat.server.form_action(obj, 'DELETE ROLE');

}
function deleteCategory(D) {
    var user_id = $(this).data("id");
    console.log("support ID: " + user_id)
    $(`[data-id='${D}']`).closest('tr').remove();
    var obj = JSON.stringify({
        SDA_CATEGORY_ID: D
    })
    chat.server.form_action(obj, 'DELETE CATEGORIES');
}
function resetTable() {
    fetchTable();
}
function supportChatFunc(v) {
    var obj = JSON.stringify({
        SDA_BODY_ID: v
    })
    chat.server.form_action(obj, 'SUPPORT HISTORY');
}
function adminClose() {
    var obj = JSON.stringify({
    })
    chat.server.form_action(obj, 'ADMIN CLOSE');
}
function changeComplainStatus(D) {
    console.log(D)
    alert('Category Changed!!')
    var obj = JSON.stringify({
        SDA_BODY_ID: D
    })
    chat.server.form_action(obj, 'SUPPORT CHANGE');
}
function AdminCheck() {
    var obj = JSON.stringify({
    })
    chat.server.form_action(obj, 'ADMIN DASHBOARD');
}
function AdminCheck2() {
    var obj = JSON.stringify({
    })
    chat.server.form_action(obj, 'ADMIN DASHBOARD2');
}
function customerProfileChecker(k) {
    console.log(k)
    var obj = JSON.stringify({
        SDA_CUSTOMER_ID: k
    })
    chat.server.form_action(obj, 'CUSTOMER PROFILE');
}
function viewInfo(x){
    var obj = JSON.stringify({
        SDA_SUPPORT_ID: x
    })
    chat.server.form_action(obj, 'SUPPORT PROFILE');
}