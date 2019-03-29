function loadCourierOrders(index, search) {
    $.getJSON("/adminOrders/" + index + "?search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderCourierColumns.length; i++) {
            var currentElement = orderCourierColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            $("#dataGridBody").append(`<tr ${
                currentElement.status === 1 ? "style='background-color: purple;color: white'" :
                    currentElement.status === 2 ? "style='background-color: red;color: white'" :
                        currentElement.status === 3 ? "style='background-color: yellow;color: white'" :
                            ""} value='${i}'   class='gridRow ${currentElement.status === 1 ? "whitetd" : ""}' ><td>${currentElement.id}</td><td>${currentElement["name"]}</tdtd><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.address}</td></tr>`);
        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadCourierOrders($(this).val(), search)
        });


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);

            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(OrderTemplate);
                head.html("#" + currentElement.uuid.substring(0, 8))
                var details = $("#tab5_1");
                var actions = $("#tab6_1");
                var DOMElements = {
                    details: details,
                    actions: actions,
                    modal: modal,
                    rand: rand,
                    currentElement: currentElement
                };

                drawOrderDetails(DOMElements);
                drawActions(DOMElements);

            }, {}, 1024);
        })

    });

    function drawActions(DOMElements) {
        DOMElements.actions.html("")


        if (DOMElements.currentElement.status === 1)
            createButtonWithHandlerr(DOMElements.actions, "ჩავიბარე", function () {
                $.getJSON(`/chavibare/${DOMElements.currentElement.id}`, function (result) {
                    if (result == 1) {
                        DOMElements.modal.modal("hide");
                        loadCourierOrders(index, search)
                    }
                    if (result == 2) {
                        alert("ყველა პროდუქტი არ არის მოტანილი გუდვილში!")
                    }
                })
            });
        if (DOMElements.currentElement.status === 2)
            createButtonWithHandlerr(DOMElements.actions, "გზაშია", function () {
                $.getJSON(`/gzashia/${DOMElements.currentElement.id}`, function (result) {
                    if (result) {
                        DOMElements.modal.modal("hide");
                        loadCourierOrders(index, search)
                    }
                })
            });
        if (DOMElements.currentElement.status === 3)
            createButtonWithHandlerr(DOMElements.actions, "ჩაბარებულია", function () {
                $.getJSON(`/chabarebulia/${DOMElements.currentElement.id}`, function (result) {
                    if (result) {
                        DOMElements.modal.modal("hide");
                        loadCourierOrders(index, search)
                    }
                })
            });
    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.orderPrice} ლარი(ტრანსპორტირების ჩათვლით)</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქტები",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ფასი"
                        },
                        store: {
                            name: "მაღაზია"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr style="${!orderItem.atGoodwill ? 'background-color:red' : ''}">
                                                <td>${orderItem.cartItem.storeProduct.code}</td>
                                                <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                                <td>${orderItem.cartItem.storeProduct.store.name}</td>
                                         </tr>`);

                        }
                    });
                }
            }
        ])
    }


}

function loadCourierOrders2(index, search) {
    $.getJSON("/getordersforcourier2", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderCourierColumns.length; i++) {
            var currentElement = orderCourierColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            if (currentElement.notMainStores.length > 0)
                $("#dataGridBody").append(`<tr ${
                    currentElement.status === 1 && !currentElement.storeGaveItemsToCourier ? "style='background-color: purple;color: white'" :
                        currentElement.status === 1 && currentElement.storeGaveItemsToCourier && !currentElement.courierAcceptedItems ? "style='background-color: red;color: white'" :
                            currentElement.status === 2 && currentElement.storeGaveItemsToCourier && currentElement.courierAcceptedItems ? "style='background-color: yellow;color: white'" :
                                ""} value='${i}'   class='gridRow ${currentElement.status !== 3 ? "whitetd" : ""}' ><td>${currentElement.id}</td><td>${currentElement["name"]}</td><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.address}</td></tr>`);
        }


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);

            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(OrderTemplate);
                head.html("#" + currentElement.uuid.substring(0, 8))
                var details = $("#tab5_1");
                var actions = $("#tab6_1");
                var DOMElements = {
                    details: details,
                    actions: actions,
                    modal: modal,
                    rand: rand,
                    currentElement: currentElement
                };

                drawOrderDetails(DOMElements);
                drawActions(DOMElements);

            }, {}, 1024);
        })

    });

    function drawActions(DOMElements) {
        DOMElements.actions.html("")

        var notMainStores = DOMElements.currentElement.notMainStores
        for (key in notMainStores) {

            $(function () {

                createButtonWithHandlerr(DOMElements.actions, `დაჯავშნა ${notMainStores[key].name}-თან`, function () {
                    $.getJSON(`/chavibareother/${DOMElements.currentElement.id}/${notMainStores[key].id}`, function (result) {
                        DOMElements.modal.modal("hide");
                        loadCourierOrders2(index, search)
                    })
                })
            });

        }


    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.orderPrice} ლარი(ტრანსპორტირების ჩათვლით)</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქტები",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ფასი"
                        },
                        store: {
                            name: "მაღაზია"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr>
                                               <td>${orderItem.cartItem.storeProduct.code}</td>
                                               <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                                <td>${orderItem.cartItem.storeProduct.store.name}</td>
                                         </tr>`);

                        }
                    });
                }
            }
        ])
    }


}

function loadCourierOrders4(index, search) {
    $.getJSON("/getordersforcourier2", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderCourierColumns.length; i++) {
            var currentElement = orderCourierColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            if (currentElement.notMainStoresOrdered.length > 0)
                $("#dataGridBody").append(`<tr ${
                    currentElement.status === 1 && !currentElement.storeGaveItemsToCourier ? "style='background-color: purple;color: white'" :
                        currentElement.status === 1 && currentElement.storeGaveItemsToCourier && !currentElement.courierAcceptedItems ? "style='background-color: red;color: white'" :
                            currentElement.status === 2 && currentElement.storeGaveItemsToCourier && currentElement.courierAcceptedItems ? "style='background-color: yellow;color: white'" :
                                ""} value='${i}'   class='gridRow ${currentElement.status !== 3 ? "whitetd" : ""}' ><td>${currentElement.id}</td><td>${currentElement["name"]}</td><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.address}</td></tr>`);
        }


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);

            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(OrderTemplate);
                head.html("#" + currentElement.uuid.substring(0, 8))
                var details = $("#tab5_1");
                var actions = $("#tab6_1");
                var DOMElements = {
                    details: details,
                    actions: actions,
                    modal: modal,
                    rand: rand,
                    currentElement: currentElement
                };

                drawOrderDetails(DOMElements);
                drawActions(DOMElements);

            }, {}, 1024);
        })

    });

    function drawActions(DOMElements) {
        DOMElements.actions.html("")

        var notMainStoresOrdered = DOMElements.currentElement.notMainStoresOrdered
        for (key in notMainStoresOrdered) {

            $(function () {

                createButtonWithHandlerr(DOMElements.actions, `ჩავიბარე ${notMainStoresOrdered[key].name}-სგან`, function () {
                    $.getJSON(`/chavibareother2/${DOMElements.currentElement.id}/${notMainStoresOrdered[key].id}`, function (result) {
                        DOMElements.modal.modal("hide");
                        loadCourierOrders2(index, search)
                    })
                })
            });

        }

    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.orderPrice} ლარი(ტრანსპორტირების ჩათვლით)</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქტები",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ფასი"
                        },
                        store: {
                            name: "მაღაზია"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr>
                                                <td>${orderItem.cartItem.storeProduct.code}</td>
                                                <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                                <td>${orderItem.cartItem.storeProduct.store.name}</td>
                                         </tr>`);

                        }
                    });
                }
            }
        ])
    }


}

function loadCourierOrders3(index, search) {
    $.getJSON("/gettemporders", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderCourierColumns.length; i++) {
            var currentElement = orderCourierColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result;
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i].order;
            $("#dataGridBody").append(`<tr ${
                currentElement.status === 1 && !currentElement.storeGaveItemsToCourier ? "style='background-color: purple;color: white!important'" :
                    currentElement.status === 1 && currentElement.storeGaveItemsToCourier && !currentElement.courierAcceptedItems ? "style='background-color: red;color: white'" :
                        currentElement.status === 2 && currentElement.storeGaveItemsToCourier && currentElement.courierAcceptedItems ? "style='background-color: yellow;color: white'" :
                            ""} value='${i}'   class='gridRow ${currentElement.status !== 3 ? "whitetd" : ""}' ><td>${currentElement.id}</td><td>${currentElement["name"]}</td><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.address}</td></tr>`);
        }


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")].order;
            var currentElementTemp = dataArray[$(this).attr("value")];
            console.log(currentElement);

            showModalWithTableInside(function (head, body, modal, rand) {
                body.html(OrderTemplate);
                head.html("#" + currentElement.uuid.substring(0, 8))
                var details = $("#tab5_1");
                var actions = $("#tab6_1");
                var DOMElements = {
                    details: details,
                    actions: actions,
                    modal: modal,
                    rand: rand,
                    currentElement: currentElement,
                    temp: currentElementTemp
                };

                drawOrderDetails(DOMElements);
                drawActions(DOMElements);

            }, {}, 1024);
        })

    });

    function drawActions(DOMElements) {
        DOMElements.actions.html("")
        createButtonWithHandlerr(DOMElements.actions, 'ჩაბარება goodwill-ში', function () {
            $.getJSON(`/chabarebuliaother/${DOMElements.temp.id}`, function (result) {
                DOMElements.modal.modal("hide");
                loadCourierOrders3(index, search)
            })
        })

    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.orderPrice} ლარი(ტრანსპორტირების ჩათვლით)</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქტები",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ღირებულება"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr>
                                                <td>${orderItem.cartItem.storeProduct.code}</td>
                                                <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                         </tr>`);

                        }
                    });
                }
            }
        ])
    }


}


function loadSystemOrders(index, search, openId) {
    var dataArray;
    $.getJSON("/adminOrdersOperator/" + index + "?search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderProductColumns.length; i++) {
            var currentElement = orderProductColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;

        dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            if (openId && openId === currentElement.id) {
                startOpeningOrder(currentElement)
            }
            $("#dataGridBody").append(`<tr 
    ${
                currentElement.status === 1 ? "style='background-color: purple;color: white'" :
                    currentElement.status === 2 ? "style='background-color: red;color: white'" :
                        currentElement.status === 3 ? "style='background-color: yellow;color: black'" :
                            ""} 



value='${i}'   class='gridRow ${currentElement.status !== 4 || currentElement.status !== 3 ? "whitetd" : ""}' >
<td>${currentElement.id}</td><td>${currentElement["name"]}</td><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.region}</td><td>${currentElement.seen ? "ნანახია" : ""}</td></tr>`);
        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadSystemOrders($(this).val(), search)
        });


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            startOpeningOrder(currentElement);
        })

        if (!useTimeout)
            createButtonWithHandlerr($("#addNewDiv"), "ავტომატური განახლების ჩართვა", function () {
                useTimeout = true;
                $(this).remove()
            })
    });

    function startOpeningOrder(currentElement) {
        showModalWithTableInside(function (head, body, modal, rand) {
            body.html(OrderTemplate);
            head.html("#" + currentElement.uuid.substring(0, 8))
            var details = $("#tab5_1");
            var actions = $("#tab6_1");
            var DOMElements = {
                details: details,
                actions: actions,
                modal: modal,
                data: dataArray,
                rand: rand,
                currentElement: currentElement
            };

            drawOrderDetails(DOMElements);
            drawActions(DOMElements);

        }, {}, 1024);
    }

    function drawActions(DOMElements) {
        DOMElements.actions.html("")
        /*createButtonWithHandlerr(DOMElements.actions, "კურიერზე მინიჭება", function () {
            showModalWithTableInside(function (head, body, modal, rand) {
                head.html("კურიერზე მინიჭება");
                dynamicCreateForm(body, "giveordertocourier", {
                    "order": {
                        type: "hidden",
                        value: DOMElements.currentElement.id
                    },
                    "courier": {
                        type: "comboBox",
                        name: "კურიერი",
                        valueField: "id",
                        nameField: "name",
                        url: "/getstorecouriers"
                    }
                }, function () {
                    modal.modal("hide");
                    DOMElements.modal.modal("hide");
                    loadSystemOrders(index, search, DOMElements.currentElement.id);
                })
            }, {}, 400)
        });*/

    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: "რუკა",
                callback: function (body) {
                    body.append(`  <div class="mapDiv">
            <div id="map" width="100%" height="300px" frameborder="0" style="border:0" allowfullscreen></div>
        </div>`)
                    initMap()
                    geocodeAddress(
                        DOMElements.currentElement.userAddress.cityName + " " + DOMElements.currentElement.userAddress.address,
                        DOMElements.currentElement, 1, DOMElements);
                    var data = DOMElements.data;
                    for (var key in data) {
                        var item = data[key];
                        if (item.id !== DOMElements.currentElement.id) {
                            geocodeAddress(
                                item.userAddress.cityName + " " + item.userAddress.address,
                                item, 2, DOMElements);
                        }
                    }

                }
            }, {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.orderPrice} ლარი(ტრანსპორტირების ჩათვლით)</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქცია",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ფასი"
                        },
                        store: {
                            name: "მაღაზია"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr>
                                                <td>${orderItem.cartItem.storeProduct.code}</td>
                                                <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                                <td>${orderItem.cartItem.storeProduct.store.name}</td>
                                         </tr>`);

                        }
                    });
                }
            },

        ])
    }

    var geocoder = null;

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: -34.397, lng: 150.644}
        });
        google.maps.event.trigger(map, 'resize');

        geocoder = new google.maps.Geocoder();

    }

    function geocodeAddress(address, object, type, DOMElements) {

        var image = null;
        if (type === 1) {
            image = {
                url: '/p.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }
        if (type === 2) {
            image = {
                url: '/p2.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }

        (function () {
            geocoder.geocode({'address': address}, function (results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: image,
                        position: results[0].geometry.location,
                        click: function () {
                            alert("kaxa")
                        }
                    });
                    if (type !== 1)
                        marker.addListener('click', function () {
                            DOMElements.modal.modal("hide");
                            startOpeningOrder(object)
                        });
                } else {

                }
            });
        })()

    }

}

function loadGzashiOrders(index, search, openId) {
    var dataArray;
    $.getJSON("/adminOrdersGzashi/" + index + "?search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderProductColumns.length; i++) {
            var currentElement = orderProductColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;

        dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            if (openId && openId === currentElement.id) {
                startOpeningOrder(currentElement)
            }
            $("#dataGridBody").append(`<tr 
    ${
                currentElement.status === 1 ? "style='background-color: purple;color: white'" :
                    currentElement.status === 2 ? "style='background-color: red;color: white'" :
                        currentElement.status === 3 ? "style='background-color: yellow;color: black'" :
                            ""} 



value='${i}'   class='gridRow' ><td>${currentElement.id}</td><td>${currentElement["name"]}</td><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.region}</td></tr>`);
        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadGzashiOrders($(this).val(), search)
        });


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            startOpeningOrder(currentElement);
        })

    });

    function startOpeningOrder(currentElement) {
        showModalWithTableInside(function (head, body, modal, rand) {
            body.html(OrderTemplate);
            head.html("#" + currentElement.uuid.substring(0, 8))
            var details = $("#tab5_1");
            var actions = $("#tab6_1");
            var DOMElements = {
                details: details,
                actions: actions,
                modal: modal,
                data: dataArray,
                rand: rand,
                currentElement: currentElement
            };

            drawOrderDetails(DOMElements);
            drawActions(DOMElements);

        }, {}, 1024);
    }

    function drawActions(DOMElements) {
        DOMElements.actions.html("")
        /*
                createButtonWithHandlerr(DOMElements.actions, "კურიერზე მინიჭება", function () {
                    showModalWithTableInside(function (head, body, modal, rand) {
                        head.html("კურიერზე მინიჭება");
                        dynamicCreateForm(body, "giveordertocourier", {
                            "order": {
                                type: "hidden",
                                value: DOMElements.currentElement.id
                            },
                            "courier": {
                                type: "comboBox",
                                name: "კურიერი",
                                valueField: "id",
                                nameField: "name",
                                url: "/getstorecouriers"
                            }
                        }, function () {
                            modal.modal("hide");
                            DOMElements.modal.modal("hide");
                            loadSystemOrders(index, search, DOMElements.currentElement.id);
                        })
                    }, {}, 400)
                });
        */
        DOMElements.actions.append(`<br><br><div>სტატუსი: ${DOMElements.currentElement.statusName}</div>`)
        if (DOMElements.currentElement.courierName) {
            DOMElements.actions.append(`<br><div>კურიერი: ${DOMElements.currentElement.courierName}</div>`)
        }
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier && DOMElements.currentElement.courierName ?
            "მაღაზიამ გადასცა კურიერს ნივთები!" : !DOMElements.currentElement.storeGaveItemsToCourier && DOMElements.currentElement.courierName ? "მაღაზიას ჯერ არ გადაუცია ნივთები კურიერისთვის!" : ""}</div>`)
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier &&
        DOMElements.currentElement.courierAcceptedItems ?
            "კურიერმა ჩაიბარა ნივთები!" :
            DOMElements.currentElement.storeGaveItemsToCourier &&
            !DOMElements.currentElement.courierAcceptedItems ?
                "კურიერს არ ჩაუბარებია ნივთები!" : ""}</div>`)

    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: "რუკა",
                callback: function (body) {
                    body.append(`  <div class="mapDiv">
            <div id="map" width="100%" height="300px" frameborder="0" style="border:0" allowfullscreen></div>
        </div>`)
                    initMap()
                    geocodeAddress(
                        DOMElements.currentElement.userAddress.cityName + " " + DOMElements.currentElement.userAddress.address,
                        DOMElements.currentElement, 1, DOMElements);
                    var data = DOMElements.data;
                    for (var key in data) {
                        var item = data[key];
                        if (item.id !== DOMElements.currentElement.id) {
                            geocodeAddress(
                                item.userAddress.cityName + " " + item.userAddress.address,
                                item, 2, DOMElements);
                        }
                    }

                }
            }, {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online'} ლარი</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქცია",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ღირებულება"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr>
                                                <td>${orderItem.cartItem.storeProduct.code}</td>
                                                <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                         </tr>`);

                        }
                    });
                }
            },

        ])
    }

    var geocoder = null;

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: -34.397, lng: 150.644}
        });
        google.maps.event.trigger(map, 'resize');

        geocoder = new google.maps.Geocoder();

    }

    function geocodeAddress(address, object, type, DOMElements) {

        var image = null;
        if (type === 1) {
            image = {
                url: '/p.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }
        if (type === 2) {
            image = {
                url: '/p2.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }

        (function () {
            geocoder.geocode({'address': address}, function (results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: image,
                        position: results[0].geometry.location,
                        click: function () {
                            alert("kaxa")
                        }
                    });
                    if (type !== 1)
                        marker.addListener('click', function () {
                            DOMElements.modal.modal("hide");
                            startOpeningOrder(object)
                        });
                } else {

                }
            });
        })()

    }

}

function loadFinishOrders(index, search, openId) {
    var dataArray;
    $.getJSON("/adminOrdersAll/" + index + "?search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderProductColumns.length; i++) {
            var currentElement = orderProductColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;

        dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            if (openId && openId === currentElement.id) {
                startOpeningOrder(currentElement)
            }
            $("#dataGridBody").append(`<tr 
    ${
                currentElement.status === 1 && !currentElement.courierName ? "style='background-color: purple;color: white'" :
                    currentElement.status === 1 && currentElement.courierName ? "style='background-color: red;color: white'" :
                        currentElement.status === 2 ? "style='background-color: yellow;color: white'" :
                            ""} 



value='${i}'   class='gridRow ${currentElement.status !== 4 ? "whitetd" : ""}' ><td>${currentElement.id}</td><td>${currentElement["name"]}</td><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.region}</td></tr>`);
        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadFinishOrders($(this).val(), search)
        });


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            startOpeningOrder(currentElement);
        })

    });

    function startOpeningOrder(currentElement) {
        showModalWithTableInside(function (head, body, modal, rand) {
            body.html(OrderTemplate);
            head.html("#" + currentElement.uuid.substring(0, 8))
            var details = $("#tab5_1");
            var actions = $("#tab6_1");
            var DOMElements = {
                details: details,
                actions: actions,
                modal: modal,
                data: dataArray,
                rand: rand,
                currentElement: currentElement
            };

            drawOrderDetails(DOMElements);
            drawActions(DOMElements);

        }, {}, 1024);
    }

    function drawActions(DOMElements) {
        DOMElements.actions.html("")
        /*
                createButtonWithHandlerr(DOMElements.actions, "კურიერზე მინიჭება", function () {
                    showModalWithTableInside(function (head, body, modal, rand) {
                        head.html("კურიერზე მინიჭება");
                        dynamicCreateForm(body, "giveordertocourier", {
                            "order": {
                                type: "hidden",
                                value: DOMElements.currentElement.id
                            },
                            "courier": {
                                type: "comboBox",
                                name: "კურიერი",
                                valueField: "id",
                                nameField: "name",
                                url: "/getstorecouriers"
                            }
                        }, function () {
                            modal.modal("hide");
                            DOMElements.modal.modal("hide");
                            loadSystemOrders(index, search, DOMElements.currentElement.id);
                        })
                    }, {}, 400)
                });
        */
        DOMElements.actions.append(`<br><br><div>სტატუსი: ${DOMElements.currentElement.statusName}</div>`)
        if (DOMElements.currentElement.courierName) {
            DOMElements.actions.append(`<br><div>კურიერი: ${DOMElements.currentElement.courierName}</div>`)
        }
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier && DOMElements.currentElement.courierName ?
            "მაღაზიამ გადასცა კურიერს ნივთები!" : !DOMElements.currentElement.storeGaveItemsToCourier && DOMElements.currentElement.courierName ? "მაღაზიას ჯერ არ გადაუცია ნივთები კურიერისთვის!" : ""}</div>`)
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier &&
        DOMElements.currentElement.courierAcceptedItems ?
            "კურიერმა ჩაიბარა ნივთები!" :
            DOMElements.currentElement.storeGaveItemsToCourier &&
            !DOMElements.currentElement.courierAcceptedItems ?
                "კურიერს არ ჩაუბარებია ნივთები!" : ""}</div>`)

    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: "რუკა",
                callback: function (body) {
                    body.append(`  <div class="mapDiv">
            <div id="map" width="100%" height="300px" frameborder="0" style="border:0" allowfullscreen></div>
        </div>`)
                    initMap()
                    geocodeAddress(
                        DOMElements.currentElement.userAddress.cityName + " " + DOMElements.currentElement.userAddress.address,
                        DOMElements.currentElement, 1, DOMElements);
                    var data = DOMElements.data;
                    for (var key in data) {
                        var item = data[key];
                        if (item.id !== DOMElements.currentElement.id) {
                            geocodeAddress(
                                item.userAddress.cityName + " " + item.userAddress.address,
                                item, 2, DOMElements);
                        }
                    }

                }
            }, {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online'} ლარი</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქცია",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ღირებულება"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr>
                                                <td>${orderItem.cartItem.storeProduct.code}</td>
                                                <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                         </tr>`);

                        }
                    });
                }
            },

        ])
    }

    var geocoder = null;

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: -34.397, lng: 150.644}
        });
        google.maps.event.trigger(map, 'resize');

        geocoder = new google.maps.Geocoder();

    }

    function geocodeAddress(address, object, type, DOMElements) {

        var image = null;
        if (type === 1) {
            image = {
                url: '/p.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }
        if (type === 2) {
            image = {
                url: '/p2.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }

        (function () {
            geocoder.geocode({'address': address}, function (results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: image,
                        position: results[0].geometry.location,
                        click: function () {
                            alert("kaxa")
                        }
                    });
                    if (type !== 1)
                        marker.addListener('click', function () {
                            DOMElements.modal.modal("hide");
                            startOpeningOrder(object)
                        });
                } else {

                }
            });
        })()

    }

}

function loadMonitorOrders(index, search, openId) {
    var dataArray;
    $.getJSON("/monitor", function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderMonitoringColumns.length; i++) {
            var currentElement = orderMonitoringColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;

        dataArray = result;

        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            if (openId && openId === currentElement.id) {
                startOpeningOrder(currentElement)
            }
            $("#dataGridBody").append(`<tr 
    ${
                currentElement.status === 1 && !currentElement.courierName ? "style='background-color: purple;color: white'" :
                    currentElement.status === 1 && currentElement.courierName ? "style='background-color: red;color: white'" :
                        currentElement.status === 2 ? "style='background-color: yellow;color: white'" :
                            ""} value='${i}'   class='gridRow' >
    <td>${currentElement.courierName}</td>
    <td>${currentElement.userAddress.cityName + " " + currentElement.userAddress.address}</td>
    <td>${currentElement.courierPhone}</td>
    <td>${currentElement.phone}</td><td>${currentElement.userAddress.region}</td>
    </tr>`);
        }


        var gridRow = $('.gridRow');
        gridRow.css('cursor', 'pointer');
        gridRow.unbind();
        gridRow.click(function () {
            var currentElement = dataArray[$(this).attr("value")];
            console.log(currentElement);
            startOpeningOrder(currentElement);
        })

    });

    function startOpeningOrder(currentElement) {
        showModalWithTableInside(function (head, body, modal, rand) {
            body.html(OrderTemplate);
            head.html("#" + currentElement.uuid.substring(0, 8))
            var details = $("#tab5_1");
            var actions = $("#tab6_1");
            var DOMElements = {
                details: details,
                actions: actions,
                modal: modal,
                data: dataArray,
                rand: rand,
                currentElement: currentElement
            };

            drawOrderDetails(DOMElements);
            drawActions(DOMElements);

        }, {}, 1024);
    }

    function drawActions(DOMElements) {
        DOMElements.actions.html("")
        /*
                createButtonWithHandlerr(DOMElements.actions, "კურიერზე მინიჭება", function () {
                    showModalWithTableInside(function (head, body, modal, rand) {
                        head.html("კურიერზე მინიჭება");
                        dynamicCreateForm(body, "giveordertocourier", {
                            "order": {
                                type: "hidden",
                                value: DOMElements.currentElement.id
                            },
                            "courier": {
                                type: "comboBox",
                                name: "კურიერი",
                                valueField: "id",
                                nameField: "name",
                                url: "/getstorecouriers"
                            }
                        }, function () {
                            modal.modal("hide");
                            DOMElements.modal.modal("hide");
                            loadSystemOrders(index, search, DOMElements.currentElement.id);
                        })
                    }, {}, 400)
                });
        */
        DOMElements.actions.append(`<br><br><div>სტატუსი: ${DOMElements.currentElement.statusName}</div>`)
        if (DOMElements.currentElement.courierName) {
            DOMElements.actions.append(`<br><div>კურიერი: ${DOMElements.currentElement.courierName}</div>`)
        }
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier && DOMElements.currentElement.courierName ?
            "მაღაზიამ გადასცა კურიერს ნივთები!" : !DOMElements.currentElement.storeGaveItemsToCourier && DOMElements.currentElement.courierName ? "მაღაზიას ჯერ არ გადაუცია ნივთები კურიერისთვის!" : ""}</div>`)
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier &&
        DOMElements.currentElement.courierAcceptedItems ?
            "კურიერმა ჩაიბარა ნივთები!" :
            DOMElements.currentElement.storeGaveItemsToCourier &&
            !DOMElements.currentElement.courierAcceptedItems ?
                "კურიერს არ ჩაუბარებია ნივთები!" : ""}</div>`)

    }

    function drawOrderDetails(DOMElements) {
        createAcordion(DOMElements.details, [
            {
                name: "რუკა",
                callback: function (body) {
                    body.append(`  <div class="mapDiv">
            <div id="map" width="100%" height="300px" frameborder="0" style="border:0" allowfullscreen></div>
        </div>`)
                    initMap()
                    geocodeAddress(
                        DOMElements.currentElement.userAddress.cityName + " " + DOMElements.currentElement.userAddress.address,
                        DOMElements.currentElement, 1, DOMElements);
                    var data = DOMElements.data;
                    for (var key in data) {
                        var item = data[key];
                        if (item.id !== DOMElements.currentElement.id) {
                            geocodeAddress(
                                item.userAddress.cityName + " " + item.userAddress.address,
                                item, 2, DOMElements);
                        }
                    }

                }
            }, {
                name: strings.admin_tab_info,
                callback: function (body) {
                    body.append(`<div class='row'><div class='col-md-4'>მომხმარებელი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>სტატუსი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.statusName}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.userAddress.region + " " + DOMElements.currentElement.userAddress.address}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>შეკვეთის დრო:</div>
                                    <div class='col-md-8'>${moment(new Date(DOMElements.currentElement.createDate)).locale("ka").format("LLL")}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>მობილური:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.phone}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>გადახდის მეთოდი:</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType !== 'Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ღირებულება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.orderPrice} ლარი(ტრანსპორტირების ჩათვლით)</div>
                                 </div>`);
                    body.append(`<div class='row'><div class='col-md-4'>ტრანსპორტირება</div>
                                    <div class='col-md-8'>${DOMElements.currentElement.mitana} ლარი</div>
                                 </div>`);
                }
            },
            {
                name: "შეკვეთილი პროდუქცია",
                callback: function (body) {
                    createTable(body, {
                        image: {
                            name: "code"
                        },
                        image2: {
                            name: "წონა"
                        },
                        name: {
                            name: "სახელი"
                        },
                        type: {
                            name: "კატეგორია"
                        },
                        count: {
                            name: "რაოდენობა"
                        },
                        price: {
                            name: "ღირებულება"
                        }
                    }, function (tbody) {

                        for (var key in DOMElements.currentElement.orderItems) {
                            var orderItem = DOMElements.currentElement.orderItems[key];
                            tbody.append(`<tr>
                                                <td>${orderItem.cartItem.storeProduct.code}</td>
                                                <td>${orderItem.cartItem.storeProduct.size}</td>
                                                <td>${orderItem.cartItem.storeProduct.name}</td>
                                                <td>${orderItem.cartItem.storeProduct.type}</td>
                                                <td>${orderItem.cartItem.count}</td>
                                                <td>${orderItem.cartItem.sumPrice}</td>
                                         </tr>`);

                        }
                    });
                }
            },

        ])
    }

    var geocoder = null;

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: -34.397, lng: 150.644}
        });
        google.maps.event.trigger(map, 'resize');

        geocoder = new google.maps.Geocoder();

    }

    function geocodeAddress(address, object, type, DOMElements) {

        var image = null;
        if (type === 1) {
            image = {
                url: '/p.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }
        if (type === 2) {
            image = {
                url: '/p2.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(32, 32),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
        }

        (function () {
            geocoder.geocode({'address': address}, function (results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        animation: google.maps.Animation.DROP,
                        icon: image,
                        position: results[0].geometry.location,
                        click: function () {
                            alert("kaxa")
                        }
                    });
                    if (type !== 1)
                        marker.addListener('click', function () {
                            DOMElements.modal.modal("hide");
                            startOpeningOrder(object)
                        });
                } else {

                }
            });
        })()

    }

}