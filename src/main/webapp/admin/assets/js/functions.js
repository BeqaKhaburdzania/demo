/**
 * Created by KGelashvili on 10/26/2015.
 */


var currentFunction;
var datarowSlide = false;
var dashRow = false;
var currentPage = 1;
var permissions = {};
var useTimeout = false;

$(document).ready(() => {
    let access = readCookie('access_token');
    let refresh = readCookie('refresh_token');
    if (access !== null) {
        $.ajaxSetup({
            headers: {
                'Authorization': 'Bearer ' + access
            }
        });
    }
    else if (refresh !== null) {
        $.ajax({
            async: true,
            crossDomain: true,
            url: REQUESTURL+"/auth/refresh",
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + refresh
            },
            success:  (tokens)=> {
                createCookie('access_token', tokens.access_token, tokens.expires_in);
                createCookie('refresh_token', tokens.refresh_token, 3600);
                $.ajaxSetup({
                    headers: {
                        'Authorization': 'Bearer ' + tokens.access_token
                    }
                });
            }
        })
    }
});


$(document).ready(function () {
    var searchText = $("#searchText");
    var navigation = $("#navigationUl");
    //
    // navigation.append('<li id="loadUsersButton" class="k">' +
    //     '<a href="#"><img src="/images/admin_icons/users.png"  height="13" width="13"><span data-translate="">მომხმარებლები</span></a></li>');
    // $("#loadUsersButton").click(function () {
    //     $(".k").attr("class", "k");
    //     $(this).attr("class", "k nav-active active");
    //     $("#searchparams").html("");
    //     if (datarowSlide) {
    //         $("#dataRow").slideDown("slow");
    //         $("#dashRow").slideUp("slow");
    //         datarowSlide = true;
    //     }
    //     loadUsersData(0, "",1);
    //     searchText.unbind();
    //     searchText.change(function () {
    //         var value = $(this).val();
    //         loadUsersData(0, value,1);
    //     })
    //
    // });



    navigation.append('<li id="loadProperties" class="k">' +
        '<a href="#"><img src="/images/admin_icons/users.png"  height="13" width="13"><span data-translate="">ფართები</span></a></li>' +
        '<li id="loadUsers" class="k"><img src="/images/admin_icons/users.png"  height="13" width="13"><a href="#"><span data-translate="">მომხმარებლები</span></a></li>' +
        '<li id="loadBrokers" class="k"><img src="/images/admin_icons/users.png"  height="13" width="13"><a href="#"><span data-translate="">ბროკერები</span></a></li>');
    $("#loadProperties").click(function () {
        $(".k").attr("class", "k");
        $(this).attr("class", "k nav-active active");
        $("#searchparams").html("");
        if (datarowSlide) {
            $("#dataRow").slideDown("slow");
            $("#dashRow").slideUp("slow");
            datarowSlide = true;
        }
        loadProperties(0, "");
        searchText.unbind();
        searchText.change(function () {
            var value = $(this).val();
            loadProperties(0, value);
        })

    });

    $("#loadUsers").click(function () {
        $(".k").attr("class", "k");
        $(this).attr("class", "k nav-active active");
        $("#searchparams").html("");
        if (datarowSlide) {
            $("#dataRow").slideDown("slow");
            $("#dashRow").slideUp("slow");
            datarowSlide = true;
        }
        loadUsers(0, "");
        searchText.unbind();
        searchText.change(function () {
            var value = $(this).val();
            loadUsers(0, value);
        })
    });

    $("#loadBrokers").click(function () {
        console.log('ndndndndndndndn');
        $(".k").attr("class", "k");
        $(this).attr("class", "k nav-active active");
        $("#searchparams").html("");
        if (datarowSlide) {
            $("#dataRow").slideDown("slow");
            $("#dashRow").slideUp("slow");
            datarowSlide = true;
        }
        loadBrokers(0, "");
        searchText.unbind();
        searchText.change(function () {
            var value = $(this).val();
            loadBrokers(0, value);
        })
    });





    // navigation.append('<li id="loadParameters" class="k">' +
    //     '<a href="#"><img src="/images/admin_icons/users.png"  height="13" width="13"><span data-translate="">პარამეტრები</span></a></li>');
    // $("#loadParameters").click(function () {
    //     $(".k").attr("class", "k");
    //     $(this).attr("class", "k nav-active active");
    //     $("#searchparams").html("");
    //     if (datarowSlide) {
    //         $("#dataRow").slideDown("slow");
    //         $("#dashRow").slideUp("slow");
    //         datarowSlide = true;
    //     }
    //     loadCategoriesData(0, "");
    //     searchText.unbind();
    //     searchText.change(function () {
    //         var value = $(this).val();
    //         loadUsersData(0, value);
    //     })
    //
    // });

    loadProperties(0, "");


    $("#dashRow").hide();

    $("#logoutBtn").click(function () {
        eraseCookie("projectSessionId");
        window.location.href = "/";
    });


    $("#settingsBtn").click(function () {

        showModalWithTableInside(function (head, body, modal, rand) {
            body.append("<button class='btn btn-flat' id='callConnect'>Connect Google Calendar</button>")
            $("#callConnect").click(function () {
                window.open("https://accounts.google.com/o/oauth2/v2/auth?" +
                    "scope=https://www.googleapis.com/auth/calendar&" +
                    "access_type=offline&" +
                    "prompt=consent&" +
                    "include_granted_scopes=true&" +
                    "state=state_parameter_passthrough_value&" +
                    "redirect_uri=http://localhost:8081/oauthcall&" +
                    "response_type=code&" +
                    "client_id=55995473742-00obqav5bir1au4qdn4l1jgdvf7kbmv2.apps.googleusercontent.com", "_blank");

            });
            $.getJSON("/getmycalendarslist",function (result) {
                console.log(result);
                if(result){
                    var calendarItems=[];
                    body.append("<br><div>" +
                        "<select style='margin-top: 50px;display: inline;width: 60%' class='form-control' id='calSelect'>" +
                        "<option value='0'>აირჩიეთ კალენდარი</option></select>" +
                        "<button style='margin-top: 50px;margin-left: 10px;width: 20%' id='saveCallBtn' class='btn'>"+strings["admin_button_save"]+"</button></div>")
                    for(var key in result.items){
                        var item=result.items[key];
                        if(item.accessRole==="owner"){

                            $("#calSelect").append("<option value='"+item.id+"'>"+item.summary+"</option>")
                            calendarItems.push({
                                name:item.summary,
                                id:item.id
                            })
                        }
                    }
                    $("#saveCallBtn").click(function () {
                        if($("#calSelect").val())
                        $.getJSON("/setcalendarid?id="+$("#calSelect").val(),function (result) {
                            if(result){
                                alert("Calendar Saved As Default");
                            }
                        })
                    });



                }

            })



        }, {}, 600);

    });
});
function search(e) {
    if (e === 13) {
        console.log(e)
        currentFunction(0, $("#searchText").val());
    }
}

