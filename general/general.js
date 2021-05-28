var userdata = JSON.parse(window.localStorage.getItem('user'));


var load = (function(){
    return{
        setDetails: function(){
            if (userdata == null){
                window.location.href = "/sda"
            }
            $('.loggedname').html(userdata.SDA_SUPPORT_NAME );
            load.pageEvents();
        },
        pageEvents: function(){
            $('#logout').off("click").on("click", function () {
                window.location.href = "/sda"
                window.localStorage.removeItem('user');
            })
        },
    }
}())

console.log("page loaded")
load.setDetails();

