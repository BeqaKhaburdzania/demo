
function loadStoreProducts(index, search) {
    $.getJSON("/getStoreProducts/" + index + "?search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < storeProductColumns.length; i++) {
            var currentElement = storeProductColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];

            $("#dataGridBody").append("<tr value='" + i + "'   class='gridRow' ><td>"+currentElement.store.name+"</td><td>" + currentElement["name"] + "</td>" +
                "<td>" + currentElement["type"] + "</td>" + "<td>" + currentElement["subType"] + "</td>" + "<td>" + currentElement["price"] + "</td>" +
                "<td>" + currentElement["size"] + "</td>" +
                "<td>" + currentElement["code"] + "</td>" +
                "<td><a value='" + currentElement['id'] + "' class='deleteCat' href='#'><i class='fa fa-times'></i></a></td>" +
                "</tr>");

        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadStoreProducts($(this).val(), search)
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
        $("#addNewDiv").html('<button id="addNewButton" data-target="#myModal" class="btn btn-sm btn-dark">' + strings["store_product_add_btn"] + '</button>');
        $("#addNewButton").click(function () {
            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "/createStoreProduct", {
                    code: {
                        name: "ბარკოდი",
                        type: "text"
                    },
                    name: {
                        name: strings["store_product_name"],
                        type: "text"
                    },
                    type: {
                        name: strings["store_product_type"],
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        url: "/types"
                    },
                    subType: {
                        name: strings["store_product_sub_type"],
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        url: "/subTypes",
                        depends: {
                            field: "type",
                            urlTemplate: "/{type}"
                        }
                    },
                    price: {
                        name: strings["store_product_price"],
                        type: "number"
                    },
                    count4: {
                        name: 'კოეფიციენტი',
                        type: "number"
                    },
                    description: {
                        name: 'აღწერა',//TODO add label to DB
                        type: "text"
                    },
                    size: {
                        name: 'წონა',//TODO add label to DB
                        type: "text"
                    }
                }, function () {
                    modal.modal("hide");
                    loadStoreProducts(0, search);
                })
            })
        });

        createButtonWithHandlerr($("#addNewDiv"),"import",function () {
            showModalWithTableInside(function (head, body, modal, rand) {
                head.html("იმპორტი")
                body.html("<form method='post' action='/updateProducts' enctype=\"multipart/form-data\">\n" +
                    "          Select file : <input type='file' name='file' id='importProductFile' class='form-control' ><br>\n" +
                    "<select name='regionId' id='importRegion'>\n" +
                    "  <option value=\"1\">ვაკე</option>\n" +
                    "  <option value=\"2\">ვერა</option>\n" +
                    "  <option value=\"3\">მთაწმინდა</option>\n" +
                    "</select>" +
                    "<input type='submit' class='btn btn-info' value='Upload' id='upload'>" +
                    "</form>"
                )

               // modal.modal("hide")
            },{},500)
        })

        createButtonWithHandlerr($("#addNewDiv"),"export",function () {
            showModalWithTableInside(function (head, body, modal, rand) {
                head.html("ექსპორტი")
                body.html("<form method='get' action='/export' enctype=\"multipart/form-data\">\n" +
                    "<input type='submit' class='btn btn-info' value='Export' id='export'>" +
                    "</form>"
                )

                // modal.modal("hide")
            },{},500)
        })


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(StoreProductTemplate);
                var details = $("#tab5_1");
                var sales = $("#tab5_2");
                var actions = $("#tab6_1");
                var infoDiv = $("#tab6_2");
                var DOMElements = {
                    details: details,
                    sales: sales,
                    actions: actions,
                    infoDiv: infoDiv,
                    modal: modal,
                    rand: rand,
                    currentElement: currentElement
                };


                drawGalleryTab(DOMElements, 0);
                drawDetails(DOMElements);
                drawActionsTab(DOMElements);


            }, {
                "დამატებითი ღილაკი": function () {
                }
            }, 1024);
        })

    });

    function drawGalleryTab(DOMElements, index) {

        DOMElements.details.html("");
        DOMElements.details.append("<input style='display: none' id='pictureField' type='file'/>")
        createButtonWithHandlerr(DOMElements.details, "Upload Picture", function () {
            $("#pictureField").click();
        });
        DOMElements.details.append("<div id='picturesDiv'></div>");
        DOMElements.picturesDiv = $("#picturesDiv");
        drawGallery(DOMElements);
        $("#pictureField").change(function () {
            var obj = this;
            var sendData = [];


            uploadFileToUrl(obj, 'uploadProductPic/' + DOMElements.currentElement.id, function () {
                drawGallery(DOMElements);
            });

            function uploadFileToUrl(obj, url, callback) {
                var formData = new FormData();
                var xhr = new XMLHttpRequest();

                for (var i = 0; i < obj.files.length; i++) {
                    //TODO Append in php files array
                    formData.append('file', obj.files[i]);
                    console.log('Looping trough passed data', obj.files[i]);
                }

                //On successful upload response, parse JSON data
                //TODO handle response from php server script
                xhr.onload = function () {
                    var data = JSON.parse(this.responseText);
                    callback();
                };

                //Open an AJAX post request
                xhr.open('post', url);
                xhr.send(formData);
            }
        });
    }

    function drawGallery(DOMElements) {
        DOMElements.picturesDiv.html("");
        $.getJSON("getProductPictures/" + DOMElements.currentElement.id, function (result) {
            createTable(DOMElements.picturesDiv, {
                image: {
                    name: "image"
                },
                download: {
                    name: "download"
                }
            }, function (table) {
                for (key in result) {
                    var item = result[key];
                    table.append("<tr><td><img style='height: 50px' src='picture/" + item.name + "'></td>" +
                        "<td><a href='picture/" + item.name + "'>download</a></td></tr>")


                }
            })
        })
    }

    function drawDetails(DOMElements) {
        DOMElements.infoDiv.html("");
        createButtonWithHandlerr(DOMElements.infoDiv, "Change Details", function () {
            showModalWithTableInside(function (head, body, modal) {
                dynamicCreateForm(body, "changeProductDetails", {
                    id: {
                        type: "hidden",
                        value: DOMElements.currentElement.id
                    },
                    name: {
                        name: "name",
                        type: "text",
                        value: DOMElements.currentElement.name
                    },
                    price: {
                        name: strings.admin_label_price,
                        type: "number",
                        filter: function (val) {
                            return val >= 0;
                        },
                        value: DOMElements.currentElement.price
                    },
                    code: {
                        name: "code",
                        type: "text",
                        value: DOMElements.currentElement.code
                    },
                    quantity: {
                        name: "count",
                        type: "number",
                        value: DOMElements.currentElement.count
                    },
                    count4: {
                        name: "კოეფიციენტი",
                        type: "number",
                        value: DOMElements.currentElement.count4
                    },
                    description: {
                        name: "description",
                        type: "text",
                        value: DOMElements.currentElement.description
                    },
                    size: {
                        name: "წონა",
                        type: "text",
                        value: DOMElements.currentElement.size
                    },
                    pod: {
                        name: 'დღის პროდუქტი',
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        data:[
                            {id:"0",name:"არა"},
                            {id:"1",name:"კი"}
                        ],
                        value:(DOMElements.currentElement.pod?1:0)
                    },
                    np: {
                        name: 'ახალი პროდუქტი',
                        type: "comboBox",
                        valueField: "id",
                        nameField: "name",
                        data:[
                            {id:"0",name:"არა"},
                            {id:"1",name:"კი"}
                        ],
                        value:(DOMElements.currentElement.np?1:0)
                    }
                }, function () {
                    modal.modal("hide");
                    DOMElements.modal.modal("hide");
                    loadStoreProducts(index, search);
                })
            })
        });
        DOMElements.infoDiv.append("<h2>" + strings.admin_label_price + ":" + DOMElements.currentElement.price + "</h2>");
        DOMElements.infoDiv.append("<h2>" + strings.admin_label_code + ":" + DOMElements.currentElement.code + "</h2>");
        DOMElements.infoDiv.append("<h2>" + strings.admin_label_quantity + ":" + DOMElements.currentElement.count + "</h2>");
        DOMElements.infoDiv.append("<h2>" + strings.admin_label_description + ":</h2><span>" + DOMElements.currentElement.description + "</span>");
    }

    function drawActionsTab(DOMElements) {
        DOMElements.actions.html("");

        var sample = "<div class=\"panel-group panel-accordion dark-accordion\" id=\"accordion2\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4>\n                <a class=\"\" data-toggle=\"collapse\"\n                   data-parent=\"#accordion2\" href=\"#collapseOne2\"\n                   aria-expanded=\"true\">\n                    <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\n                    მოქმედებების ისტორია\n                </a>\n            </h4>\n        </div>\n        <div id=\"collapseOne2\" class=\"panel-collapse collapse in\"\n             aria-expanded=\"true\">\n            <div id=\"movementsGridDiv\" class=\"panel-body\">\n\n            </div>\n        </div>\n    </div>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4>\n                <a class=\"collapsed\" data-toggle=\"collapse\"\n                   data-parent=\"#accordion2\" href=\"#collapseTwo2\"\n                   aria-expanded=\"false\">\n                    <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\n                    დაფარვის ისტორია\n                </a>\n            </h4>\n        </div>\n        <div id=\"collapseTwo2\" class=\"panel-collapse collapse\"\n             aria-expanded=\"false\" style=\"height: 0px;\">\n            <ul id=\"graphsNavigation\" class=\"nav nav-tabs\">\n                <li class=\"active\"><a href=\"#tab4_1\" data-toggle=\"tab\"\n                                      aria-expanded=\"true\">\n                    <i class=\"fa fa-area-chart\" aria-hidden=\"true\"></i>\n                    გრაფიკები\n                </a></li>\n                <li class=\"\"><a href=\"#tab4_2\" data-toggle=\"tab\"\n                                aria-expanded=\"false\">\n                    <i class=\"fa fa-percent\" aria-hidden=\"true\"></i>\n                    დარიცხული პროცენტები</a></li>\n                <li class=\"\"><a href=\"#tab4_3\" data-toggle=\"tab\"\n                                aria-expanded=\"false\">\n                    <i class=\"fa fa-credit-card\" aria-hidden=\"true\"></i>\n                    გადახდები</a></li>\n            </ul>\n            <div id=\"graphsTabs\" class=\"tab-content\">\n                <div class=\"tab-pane fade active in\" id=\"tab4_1\">\n                    <div id=\"projectCharts\" style=\"height: 300px\"\n                         class=\"panel-body\">\n\n                    </div>\n                </div>\n                <div class=\"tab-pane fade\" id=\"tab4_2\">\n                    <div id=\"loanInterestsGridDiv\">\n                        kaxa gelashvili kaaasas<br>\n                        kaxaaa\n                    </div>\n                </div>\n                <div class=\"tab-pane fade\" id=\"tab4_3\">\n                    <div id=\"loanPaymentsGridDiv\">\n                        kaxa gelashvili kaaasas<br>\n                        kaxaaa\n                    </div>\n                </div>\n            </div>\n\n\n        </div>\n    </div>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            <h4>\n                <a data-toggle=\"collapse\" data-parent=\"#accordion2\"\n                   href=\"#collapseThree2\" aria-expanded=\"false\"\n                   class=\"collapsed\">\n                    <i class=\"fa fa-key\" aria-hidden=\"true\"></i>\n                    დატვირთული უზრუნველყოფა\n                </a>\n            </h4>\n        </div>\n        <div id=\"collapseThree2\" class=\"panel-collapse collapse\"\n             aria-expanded=\"false\" style=\"height: 0px;\">\n            <div id=\"uzrunvelyofaDataGridDiv\" class=\"panel-body\">\n                kaxa gelashvili kaaasas<br>\n                kaxaaa\n            </div>\n        </div>\n    </div>\n</div>";


        $.getJSON("/citiesForProduct/" + DOMElements.currentElement.id, function (result) {
            var array = [];
            for (key in result) {

                (function () {
                    var item = result[key];
                    array.push({
                        name: item.name,
                        callback: function (body) {
                            var regions = item.cityRegions;
                            var tableString = "<table class='table'><tbody>";
                            for (regionKey in regions) {
                                var region = regions[regionKey]
                                var regionName = region.name;
                                var regionId = region.id;
                                tableString += "<tr><td>" + regionName + "</td><td><input class='regionCheckbox' val='" + region.id + "' " + (region.checked ? "checked='checked'" : '') + " type='checkbox'/></td></tr>"

                            }
                            tableString += "</tbody></table>";
                            body.append(tableString)
                            $(".regionCheckbox").unbind().click(function () {
                                var region = $(this).is(":checked")
                                if (region) {
                                    $.getJSON("/addRegionToProduct?productId=" + DOMElements.currentElement.id + "&regionId=" + $(this).attr("val"), function (result) {

                                    })
                                } else {

                                    $.getJSON("/removeRegionFromProduct?productId=" + DOMElements.currentElement.id + "&regionId=" + $(this).attr("val"), function (result) {

                                    })

                                }
                            })
                        }
                    })
                })();

            }
            createAcordion(DOMElements.actions, array);
        })
    }


}