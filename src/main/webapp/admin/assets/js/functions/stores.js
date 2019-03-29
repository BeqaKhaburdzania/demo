function loadStores(index, search) {
    $.getJSON("/getStores/"+index, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < storeColumns.length; i++) {
            var currentElement = storeColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='" + i + "'   class='gridRow' ><td>" + currentElement["name"] + "</td>" +
                "<td><a value='" + currentElement['id'] + "' class='deleteCat' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadCategoriesData($(this).val(), search)
        });
        $(".deleteCat").click(function () {
            /*)*/
            var deleteValue = $(this).attr("value");
            showBootstrapPrompt("გსურთ წაშალოთ ჩანაწერი", {
                "კი": function () {
                    $.ajax({
                        url: "/deleteCategory",
                        data: {
                            id: deleteValue
                        }
                    }).done(function (result) {
                        loadCategoriesData(index, search);
                    });
                }
            });

        });

        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">'+strings["store_add"]+'</button><div id="btn2"></div>');
        $("#addNewButton").click(function () {
            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "/createcategory", {
                    name: {
                        name: strings["admin_label_name"],
                        type: "text"
                    }
                }, function () {
                    modal.modal("hide");
                    loadCategoriesData(0, search);
                })
            })
        });

        createButtonWithHandlerr($("#btn2"),"რეგისტრაციის მოთხოვნები",function () {
            showModalWithTableInside(function (ჰეად, ბოდყ) {
                ჰეად.html("მოთხოვნები")
                createTable(ბოდყ,{
                    სახელი:{
                        name:"სახელი"
                    },
                    store: {
                        name: "მაღაზია"
                    },
                    type: {
                        name: "ტიპი"
                    },
                    email: {
                        name: "ელ-ფოსტა"
                    },
                    phone: {
                        name: "ტელეფონი"
                    },
                    description: {
                        name: "აღწერა"
                    }
                },function (ტაბლე) {
                    $.getJSON("/requestsss",function (რესულტ) {
                        for (კეყ in რესულტ){
                            var იტემ = რესულტ[კეყ]
                            ტაბლე.append(`<tr>
<td>${იტემ.name}</td>
<td>${იტემ.store}</td>
<td>${იტემ.type}</td>
<td>${იტემ.email}</td>
<td>${იტემ.phone}</td>
<td>${იტემ.description}</td>
</tr>`)
                        }
                    })
                })
            },{},1024)
        })
        createButtonWithHandlerr($("#btn2"),"კონტაქტის შეტყობინებები",function () {
            showModalWithTableInside(function (ჰეად, ბოდყ) {
                ჰეად.html("შეტყობინებები")
                createTable(ბოდყ,{
                    სახელი:{
                        name:"სახელი"
                    },
                    title: {
                        name: "სათაური"
                    },
                    email: {
                        name: "ელ-ფოსტა"
                    },
                    text: {
                        name: "შეტყობინება"
                    }
                },function (ტაბლე) {
                    $.getJSON("/getContact",function (რესულტ) {
                        for (კეყ in რესულტ){
                            var იტემ = რესულტ[კეყ]
                            ტაბლე.append(`<tr>
<td>${იტემ.name}</td>
<td>${იტემ.email}</td>
<td>${იტემ.title}</td>
<td>${იტემ.text}</td>
</tr>`)
                        }
                    })
                })
            },{},1024)
        })

        var gridRow=$('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(categoryPageTemplate);
                var documents = $("#tab5_1");
                var teachers = $("#tab5_2");
                var translations = $("#tab5_3");
                var actions = $("#tab6_1");
                var infoDiv = $("#tab6_2");
                var DOMElements = {
                    documents: documents,
                    teachers: teachers,
                    translations: translations,
                    actions: actions,
                    infoDiv: infoDiv,
                    modal: modal,
                    rand: rand,
                    currentElement:currentElement
                };




            }, {

            }, 1024);
        })

    });

}