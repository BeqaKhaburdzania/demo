function loadRecivedOrders(index, search) {
    $.getJSON("/adminOrders/" + index + "?search=" + search, function (result) {
        $("#dataGridHeader").html("");
        $("#dataGridBody").html("");
        $("#paginationUl").html("");
        for (i = 0; i < orderProductColumns.length; i++) {
            var currentElement = orderProductColumns[i];
            $("#dataGridHeader").append("<th>" + currentElement + "</th>")
        }
        currentData = result;
        var dataArray = result["content"];
        var totalPages = result["totalPages"];
        var totalElements = result["totalElements"];
        for (i = 0; i < dataArray.length; i++) {
            var currentElement = dataArray[i];
            $("#dataGridBody").append(`<tr  value='${i}'
${currentElement.status === 1 ? "style='background-color: purple;color: white'" :""}
class='gridRow ' ><td>${currentElement.id}</td><td>${currentElement["name"]}</td><td>${currentElement["phone"]}</td><td>${moment(new Date(currentElement.createDate)).locale("ka").format("LLL")}</td><td>${currentElement["statusName"]}</td><td>${currentElement.userAddress.region}</td></tr>`);
        }
        for (i = 0; i < totalPages; i++) {
            $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
        }
        $(".paginate_button").click(function () {
            //console.log($(this).val())
            loadRecivedOrders($(this).val(), search)
        });
        $("#addNewDiv").html("")
        createButtonWithHandlerr($("#addNewDiv"),"Export Orders",function () {
            showModalWithTableInside(function (head, body, modal, rand) {
                head.html("ექსპორტი")
                body.html("<form method='get' action='/exportOrders' enctype=\"multipart/form-data\">\n" +
                    "<input type='submit' class='btn btn-info' value='Export' id='export'>" +
                    "</form>"+
                    "<form method='get' action='/exportOrdersDet' enctype=\"multipart/form-data\">\n" +
                    "<input name='date' type='date'>" +
                    "<input name='date2' type='date'>" +
                    "<input type='submit' class='btn btn-info' value='დეტალური მონაცემები' id='export'>" +
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
                body.html(OrderTemplate);
                head.html("#"+currentElement.uuid.substring(0,8))
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
        DOMElements.actions.html("");
        if(!permissions["systemoperator"])
        createButtonWithHandlerr(DOMElements.actions,"ვნახე",function () {
            $.getJSON("/seen/"+DOMElements.currentElement.id,function () {
                alert("ნახვა დაფიქსირდა!")
            })
        })
       /* if(!DOMElements.currentElement.storeGaveItemsToCourier&&DOMElements.currentElement.courierName){
            createButtonWithHandlerr(DOMElements.actions,"კურიერზე ნივთების გადაცემა",function () {
                showModalWithTableInside(function (head, body, modal, rand) {
                    head.html("კურიერზე ნივთების გადაცემაზე თანხმობა");
                    dynamicCreateForm(body,"giveOrderItemsToCourier",{
                        "order":{
                            type:"hidden",
                            value:DOMElements.currentElement.id
                        }
                    },function () {
                        modal.modal("hide");
                        DOMElements.modal.modal("hide");
                        loadRecivedOrders(index, search)
                    })
                },{},400)
            });
        }else{
            if(!DOMElements.currentElement.storeGaveItemsToCourier&&!DOMElements.currentElement.courierName){

                DOMElements.actions.append(`<br><div>კურიერი არაა მინიჭებული შეკვეთაზე</div>`);
            }
        }

        if (DOMElements.currentElement.courierName) {
            DOMElements.actions.append(`<br><div>კურიერი: ${DOMElements.currentElement.courierName}</div>`)
        }
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier&&DOMElements.currentElement.courierName?
            "მაღაზიამ გადასცა კურიერს ნივთები!":"მაღაზიას ჯერ არ გადაუცია ნივთები კურიერისთვის!"}</div>`)
        DOMElements.actions.append(`<br><div>${DOMElements.currentElement.storeGaveItemsToCourier&&
        DOMElements.currentElement.courierAcceptedItems?
            "კურიერმა ჩაიბარა ნივთები!":
            DOMElements.currentElement.storeGaveItemsToCourier&&
            !DOMElements.currentElement.courierAcceptedItems?
                "კურიერს არ ჩაუბარებია ნივთები!":""}</div>`)*/
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
                                    <div class='col-md-8'>${DOMElements.currentElement.paymentType!=='Online' ? "ნაღდი ანგარიშსწორება" : "ონლაინ გადახდა"}</div>
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
                name: strings.admin_label_order_products,
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