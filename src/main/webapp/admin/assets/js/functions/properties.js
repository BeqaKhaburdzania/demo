var propertyColumns = ["#", "სახელი", 'ქალაქი', 'რეგიონი', 'მისამართი', 'ტიპი', 'ფასი', 'ფართი'];


function loadProperties(index, search) {
    $.ajax({
        type: "GET",
        url: '/property/search_admin',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            page: index,
            size: 5,
            search: search
        },
        success: (result) => {
            $('.sendUserData').hide();
            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            for (i = 0; i < propertyColumns.length; i++) {
                var currentElement = propertyColumns[i];
                $("#dataGridHeader").append("<th>" + currentElement + "</th>")
            }
            currentData = result;
            var dataArray = result["content"];
            var totalPages = result["totalPages"];
            var totalElements = result["totalElements"];
            for (i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                $("#dataGridBody").append(`<tr  value='${i}' class='gridRow ' >
          <td>${currentElement.id}</td>
          <td>${currentElement.name}</td>
          <td>${currentElement.city}</td>
          <td>${currentElement.region}</td>
          <td>${currentElement.address}</td>
          <td>${currentElement.type}</td>
          <td>${currentElement.priceFormated}</td>
          <td>${currentElement.space}</td>
          </tr>`
                );
            }
            for (i = 0; i < totalPages; i++) {
                $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
            }
            $(".paginate_button").click(function () {
                //console.log($(this).val())
                loadProperties($(this).val(), search)
            });
            $("#addNewDiv").html("")
            createButtonWithHandlerr($("#addNewDiv"), "დამატება", function () {
                showModalWithTableInside(function (head, body, modal) {
                    head.html("ახლის დამატება")
                    dynamicCreateForm(body, "/property/add", {
                        name: {
                            name: "სახელი",
                            type: "text",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        address: {
                            name: 'მისამართი',
                            type: "text",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        typeId: {
                            name: 'ტიპი',
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/property-type/all",
                            required: true
                        },
                        conditionId: {
                            name: 'მდგომარეობა',
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/property-condition/all",
                            required: true
                        },

                        userBrokerId: {
                            name: 'ბროკერი',
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/users/all-brokers",
                            required: true
                        },
                        cityId: {
                            name: 'ქალაქი',
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/property-city/all",
                            required: true
                        },
                        regionId: {
                            name: 'უბანი',
                            type: "comboBox",
                            valueField: "id",
                            nameField: "name",
                            url: "/property-region/all-by-city",
                            depends: {
                                field: "cityId",
                                urlTemplate: "/{cityId}"
                            },
                            required: true
                        },
                        space: {
                            name: 'ფართი',
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        price: {
                            name: 'ფასი',
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        rooms: {
                            name: "ოთახების რაოდენობა",
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        sleepingRoom: {
                            name: "საძინებელი ოთახების",
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        wetCorner: {
                            name: "სველი წერტილი",
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        parkingPlace: {
                            name: "პარკინგი",
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        balcony: {
                            name: "აივანი",
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        floor: {
                            name: "სართული",
                            type: "number",
                            filter: function (val) {
                                return val.length > 0
                            }
                        },
                        property_description: {
                            name: "აღწერა",
                            type: "textarea",
                            filter: function (val) {
                                return val.length > 0
                            }
                        }
                    }, function (response) {
                        if (response.id) {
                            console.log(response)
                            body.html('<div id="mapComp" style="width: 500px; height: 400px;"></div>' +
                                '<input type="hidden" id="lng">' +
                                '<input type="hidden" id="ltd">' +
                                '<button id="saveLocation">გაგრძელება</button>')
                            $("#saveLocation").click(function () {
                                var ltd = $('#ltd').val();
                                var lng = $('#lng').val();
                                $.ajax({
                                    url: `/property/${response.id}`,
                                    method: 'PUT',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "JSON",
                                    data: JSON.stringify({
                                        longitude: lng,
                                        latitude: ltd,
                                    }),
                                }).done(function (result) {
                                    body.html("<div>" +
                                        "<input style='display: none' id='pictureField' type='file'/>" +
                                        "</div>" +
                                        "<div id='galeryPlace'></div>")
                                    var upBtn = createButtonWithHandlerr(body, "სურათის ატვირთვა", function () {
                                        $("#pictureField").click();
                                    });
                                    upBtn.makeDark(true);

                                    var closeBtn = createButtonWithHandlerr(body, "დასრულება", function () {
                                        modal.modal("hide")
                                        openProperty(result)
                                    });


                                    var ia = 0;
                                    $("#pictureField").change(function () {

                                        $("#galeryPlace").append("<div style='text-align: center'>" +
                                            "<img style='height:150px;margin: 20px' id='imagePlace" + ia + "'></div>")


                                        var obj = this;
                                        var sendData = [];


                                        uploadFileToUrl(obj, '/property/image/' + response.id, function () {
                                            ia++;
                                        });


                                        function uploadFileToUrl(obj, url, callback) {
                                            var formData = new FormData();
                                            var xhr = new XMLHttpRequest();
                                            for (var i = 0; i < obj.files.length; i++) {

                                                formData.append('file', obj.files[i]);
                                                console.log('Looping trough passed data', obj.files[i]);

                                                var reader = new FileReader();

                                                reader.onload = function (e) {
                                                    $('#imagePlace' + ia).attr('src', e.target.result);
                                                }

                                                reader.readAsDataURL(obj.files[i]);
                                            }


                                            xhr.onload = function () {
                                                var data = JSON.parse(this.responseText);
                                                callback();
                                            };

                                            //Open an AJAX post request
                                            xhr.open('post', url);
                                            xhr.send(formData);

                                        }

                                    });
                                });
                            });
                            $('#mapComp').locationpicker({
                                location: {
                                    latitude: 41.718257,
                                    longitude: 44.785637
                                },
                                radius: 300,
                                inputBinding: {
                                    latitudeInput: $('#ltd'),
                                    longitudeInput: $('#lng')
                                }
                            });
                        }
                    })
                })
            })


            createButtonWithHandlerr($("#addNewDiv"), "პარამეტრები", function () {
                showModalWithTableInside(function (head, body) {
                    createAcordion(body, [{
                        name: "ქალაქები",
                        callback: function (body) {
                            body.html("<div id='newCityPlace'></div>" +
                                "<div id='citiesPlace'></div>")
                            createButtonWithHandlerr($("#newCityPlace"), "ქალაქის დამატება", function () {
                                showModalWithTableInside(function (head, body, modal) {
                                    dynamicCreateForm(body, "/property-city/add", {
                                        name: {
                                            name: "name",
                                            type: "text"
                                        }
                                    }, function (result) {
                                        if (result) {
                                            modal.modal("hide");
                                            loadCities($("#citiesPlace"))
                                            // alert("მოხდა შეცდომა!")
                                        } else {
                                            modal.modal("hide");
                                        }
                                    })


                                });

                            });
                            loadCities($("#citiesPlace"));

                        }
                    }, {
                        name: "ტიპი",
                        callback: function (body) {


                            body.html("<div id='addTypePlace'></div><div id='typesPlace'></div>");
                            createButtonWithHandlerr($("#addTypePlace"), "ახალი ტიპი", function () {
                                showModalWithTableInside(function (head, body, modal) {
                                    dynamicCreateForm(body, "/property-type/add", {
                                        name: {
                                            name: "სახელი",
                                            type: "text",
                                            filter: function (va) {
                                                return true;
                                            }
                                        }
                                    }, function (result) {
                                        modal.modal("hide");
                                        loadTypes($("#typesPlace"))
                                    })
                                }, function () {


                                }, 400)
                            });


                            loadTypes($("#typesPlace"))
                        }
                    }, {
                        name: "მდგომარეობა",
                        callback: function (body) {
                            body.html("<div id='addconditionPlace'></div><div id='conditionsPlace'></div>");
                            createButtonWithHandlerr($("#addconditionPlace"), "ახალი ტიპი", function () {
                                showModalWithTableInside(function (head, body, modal) {
                                    dynamicCreateForm(body, "/property-condition/add", {
                                        name: {
                                            name: "სახელი",
                                            type: "text",
                                            filter: function (va) {
                                                return true;
                                            }
                                        }
                                    }, function (result) {
                                        modal.modal("hide");
                                        loadConditions($("#conditionsPlace"))
                                    })
                                }, function () {


                                }, 400)
                            });


                            loadConditions($("#conditionsPlace"))
                        }
                    }])
                }, function () {

                }, 800, true)
            });

            function loadTypes(body) {
                body.html("");
                $.getJSON("/property-type/all", function (result) {
                    createTable(body, {
                        name: {name: "სახელი"}
                    }, function (tbody) {
                        for (key in result) {
                            var current = result[key]

                            tbody.append(`<tr><td>${current.name}</td><td>
<button class="btn editType" val="${current.id}" editVal="${current.name}" >ედიტირება</button>
<button class="btn deleteType" val="${current.id}" editVal="${current.name}" >წაშლა</button>
</td></tr>`)
                        }
                    })


                    $(".deleteType").unbind().click(function () {
                        var id = $(this).attr("val");
                        var editVal = $(this).attr("editVal");
                        $.ajax({
                            url: "/property-type/delete/" + id,
                            method: "DELETE",
                        }).done(function (result) {

                            loadTypes(body)
                        })
                    });
                    $(".editType").unbind().click(function () {
                        var id = $(this).attr("val");
                        var editVal = $(this).attr("editVal");
                        showModalWithTableInside(function (head, body2, modal) {
                            head.html(editVal)
                            dynamicCreateForm(body2, "/property-type/update/" + id, {
                                name: {
                                    name: 'სახელი',
                                    type: "text",
                                    value: editVal,
                                    filter: function (va) {
                                        return true;
                                    }
                                }
                            }, function (dataResponse) {

                                modal.modal("hide")
                                loadTypes(body)
                            }, "PUT")
                        }, function () {

                        }, 300, false)
                    })
                })
            }

            function loadConditions(body) {
                body.html("");
                $.getJSON("/property-condition/all", function (result) {
                    createTable(body, {
                        name: {name: "სახელი"}
                    }, function (tbody) {
                        for (key in result) {
                            var current = result[key]

                            tbody.append(`<tr><td>${current.name}</td><td>
<button class="btn editCond" val="${current.id}" editVal="${current.name}" >ედიტირება</button>
<button class="btn deleteCond" val="${current.id}" editVal="${current.name}" >წაშლა</button>
</td></tr>`)
                        }
                    })


                    $(".deleteCond").unbind().click(function () {
                        var id = $(this).attr("val");
                        var editVal = $(this).attr("editVal");
                        $.ajax({
                            url: "/property-condition/delete/" + id,
                            method: "DELETE",
                        }).done(function (result) {

                            loadConditions(body)
                        })
                    });
                    $(".editCond").unbind().click(function () {
                        var id = $(this).attr("val");
                        var editVal = $(this).attr("editVal");
                        showModalWithTableInside(function (head, body2, modal) {
                            head.html(editVal)
                            dynamicCreateForm(body2, "/property-condition/update/" + id, {
                                name: {
                                    name: 'სახელი',
                                    type: "text",
                                    value: editVal,
                                    filter: function (va) {
                                        return true;
                                    }
                                }
                            }, function (dataResponse) {

                                modal.modal("hide")
                                loadConditions(body)
                            }, "PUT")
                        }, function () {

                        }, 300, false)
                    })
                })
            }


            function loadCities(div) {
                div.html("");
                $.getJSON("/property-city/all", function (result) {
                    var acordeonData = [];
                    for (key in result) {

                        (function () {
                            var current = result[key];
                            acordeonData.push({
                                name: current.name,
                                callback: function (body) {
                                    createButtonWithHandlerr(body, "უბნის დამატება", function () {
                                        showModalWithTableInside(function (head, body, modal) {
                                            dynamicCreateForm(body, "/property-region/add", {
                                                cityId: {
                                                    type: "hidden",
                                                    value: current.id
                                                },
                                                name: {
                                                    name: "სახელი",
                                                    type: "text",
                                                    filter: function (va) {
                                                        return true;
                                                    }
                                                }
                                            }, function (result) {
                                                modal.modal("hide")
                                                loadCities(div)
                                            })
                                        }, function () {


                                        }, 400)
                                    })

                                    createButtonWithHandlerr(body, "ქალაქის შეცვლა", function () {
                                        showModalWithTableInside(function(head, body, editModal) {
                                            dynamicCreateForm(body, `/property-city/update/${current.id}`, {
                                                name: {
                                                    name: 'სახელი',
                                                    type: "text",
                                                    value: current.name,
                                                    filter: function (va) {
                                                        return true;
                                                    }
                                                }
                                            },function (response) {
                                                editModal.modal("hide")
                                                loadCities(div)
                                            }, "PUT");
                                        }, function () {

                                        }, 300, false);
                                    });
                                    createButtonWithHandlerr(body,"ქალაქის წაშლა",function () {
                                        $.ajax({
                                            url:"/property-city/delete/"+current.id,
                                            method:"DELETE"
                                        }).then(function () {
                                            loadCities(div)
                                        })
                                    });

                                    $.getJSON(`/property-region/all-by-city/${current.id}`, function (regionData) {
                                        createTable(body, {
                                            name: {name: "სახელი"},
                                            action: {name: "#"}
                                        }, function (tbody) {
                                            for (keyRegion in regionData) {
                                                var currentRegion = regionData[keyRegion];
                                                tbody.append(`<tr class="gridRow"><td>${currentRegion.name}</td>
<td><button val="${currentRegion.id}" editVal="${currentRegion.name}"  class="btn editRegion">შეცვლა</button>
<button val="${currentRegion.id}" editVal="${currentRegion.name}"  class="btn deleteRegion">წაშლა</button></td></tr>`)
                                            }

                                        })
                                        $(".deleteRegion").unbind().click(function () {
                                            var id = $(this).attr("val");
                                            var editVal = $(this).attr("editVal");
                                            $.ajax({
                                                url: "/property-region/delete/" + id,
                                                method: "DELETE",
                                            }).done(function (result) {
                                                loadCities(div)
                                            })
                                        });
                                        $(".editRegion").unbind().click(function () {
                                            var id = $(this).attr("val");
                                            var editVal = $(this).attr("editVal");
                                            showModalWithTableInside(function (head, body, modal) {
                                                head.html(editVal)
                                                dynamicCreateForm(body, "/property-region/update/" + id, {
                                                    name: {
                                                        name: 'სახელი',
                                                        type: "text",
                                                        value: editVal,
                                                        filter: function (va) {
                                                            return true;
                                                        }
                                                    }
                                                }, function (dataResponse) {
                                                    modal.modal("hide")
                                                    loadCities(div)
                                                }, "PUT")
                                            }, function () {

                                            }, 300, false)
                                        })
                                    })
                                }
                            })
                        })();
                    }
                    createAcordion(div, acordeonData)

                })
            }


            /* createButtonWithHandlerr($("#addNewDiv"), "Export Orders", function () {
                 showModalWithTableInside(function (head, body, modal, rand) {
                     head.html("ექსპორტი")
                     body.html("<form method='get' action='/exportOrders' enctype=\"multipart/form-data\">\n" +
                         "<input type='submit' class='btn btn-info' value='Export' id='export'>" +
                         "</form>" +
                         "<form method='get' action='/exportOrdersDet' enctype=\"multipart/form-data\">\n" +
                         "<input name='date' type='date'>" +
                         "<input name='date2' type='date'>" +
                         "<input type='submit' class='btn btn-info' value='დეტალური მონაცემები' id='export'>" +
                         "</form>"
                     )

                     // modal.modal("hide")
                 }, {}, 500)
             })*/

            var gridRow = $('.gridRow');
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();
            gridRow.click(function () {
                var currentElement = dataArray[$(this).attr("value")];
                openProperty(currentElement);

            })

            function openProperty(currentElement) {


                console.log(currentElement);

                showModalWithTableInside(function (head, body, modal, rand) {
                    var OrderTemplate = '<div class="row">\n    <div class="col-md-8">\n        <div claass="panel">\n            <div class="panel-header panel-controls"><h3><strong id="profile-header-1"></strong></h3></div>\n            <div class="panel-content">\n                <div class="nav-tabs2">\n                    <ul class="nav nav-tabs nav-red">\n                        <li class="active"><a href="#tab5_1" data-toggle="tab"><i class="fa fa-balance-scale"></i>დეტალები</a>\n                        </li>\n                    </ul>\n                    <div class="tab-content">\n                        <div class="tab-pane active" id="tab5_1"><p></p></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="col-md-4">\n        <div class="panel">\n            <div class="panel-header panel-controls"><h3><strong id="profile-header-2"></strong></h3></div>\n            <div class="panel-content">\n                <div class="nav-tabs2">\n                    <ul class="nav nav-tabs nav-red">\n                        <li class="active"><a href="#tab6_1" data-toggle="tab"><i class="icon-home"></i> მოქმედებები </a></li>\n                    </ul>\n                    <div class="tab-content">\n                        <div class="tab-pane active" style="font-weight: bold" id="tab6_1"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';

                    body.html(OrderTemplate);
                    head.html("#" + currentElement.name)
                    var details = $("#tab5_1");
                    var actions = $("#tab6_1");
                    var DOMElements = {
                        details: details,
                        actions: actions,
                        modal: modal,
                        rand: rand,
                        currentElement: currentElement
                    };


                    createAcordion(DOMElements.details, [
                        {
                            name: "რუკა",
                            callback: function (body) {
                                body.append(`  <div class="mapDiv">
            <div id="map" width="100%" height="300px" frameborder="0" style="border:0" allowfullscreen></div>
        </div>`)
                                initMap(currentElement)
                                /*geocodeAddress(
                                    DOMElements.currentElement.userAddress.cityName + " " + DOMElements.currentElement.userAddress.address,
                                    DOMElements.currentElement, 1, DOMElements);*/
                                var data = DOMElements.data;
                                /*  for (var key in data) {
                                      var item = data[key];
                                      if (item.id !== DOMElements.currentElement.id) {
                                          geocodeAddress(
                                              item.userAddress.cityName + " " + item.userAddress.address,
                                              item, 2, DOMElements);
                                      }
                                  }*/

                            }
                        },
                        {
                            name: "ინფორმაცია",
                            callback: function (body) {
                                console.log(DOMElements.currentElement);
                                body.append(`<div class='row'><div class='col-md-4'>სახელი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.name}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>მისამართი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.address}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>ტიპი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.type}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>მდგომარეობა:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.condition}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>ქალაქი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.city}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>უბანი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.region}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>ფასი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.price}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>ფართი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.space}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>ოთახების რაოდენობა:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.rooms}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>საძინებელი ოთახები:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.sleepingRoom}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>სველი წერტილი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.wetCorner}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>აივანი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.balcony}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>სართული:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.floor}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>პარკინგი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.parkingPlace}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>განედი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.longitude}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>გრძედი:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.latitude}</div>
                   </div>`);
                                body.append(`<div class='row'><div class='col-md-4'>აღწერა:</div>
                      <div class='col-md-8'>${DOMElements.currentElement.property_description}</div>
                   </div>`);
                            }
                        },
                        {
                            name: "ფოტო გალერეა",
                            callback: function (body) {

                                body.html("");
                                body.append("<input style='display: none' id='pictureField' type='file'/>")
                                createButtonWithHandlerr(body, "Upload Picture", function () {
                                    $("#pictureField").click();
                                });
                                body.append("<div id='picturesDiv'></div>");
                                var picturesDiv = $("#picturesDiv");
                                drawGallery(picturesDiv, currentElement.id);
                                $("#pictureField").change(function () {


                                    var obj = this;
                                    var sendData = [];


                                    uploadFileToUrl(obj, '/property/image/' + currentElement.id, function () {
                                        drawGallery(picturesDiv, currentElement.id);
                                    });


                                    function uploadFileToUrl(obj, url, callback) {
                                        var formData = new FormData();
                                        var xhr = new XMLHttpRequest();
                                        for (var i = 0; i < obj.files.length; i++) {

                                            formData.append('file', obj.files[i]);
                                            console.log('Looping trough passed data', obj.files[i]);
                                        }


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
                        },

                    ]);


                    function drawGallery(picturesDiv, id) {
                        picturesDiv.html("");
                        $.getJSON("/property/images-by-property/" + id, function (result) {
                            createTable(picturesDiv, {
                                image: {
                                    name: "image"
                                },
                                download: {
                                    name: "download"
                                },
                                actions: {
                                    name: "#"
                                }
                            }, function (table) {
                                for (key in result) {
                                    var item = result[key];
                                    table.append("<tr><td><img style='height: 50px' src='/property/image/" + item.file + "'></td>" +
                                        "<td><a href='/property/image/" + item.file + "'>download</a></td>" +
                                        "<td><button class='btn btn-danger deleteImage' val='" + item.id + "'>X</button></td>" +
                                        "</tr>")
                                }
                                $(".deleteImage").click(function () {
                                    $.ajax({
                                        url: "/property/delete-image/" + $(this).attr("val"),
                                        method: "DELETE"
                                    }).done(function (result) {
                                        drawGallery(picturesDiv, id);
                                    })
                                })
                            })
                        })
                    }


                    createButtonWithHandlerr(actions, 'ცვლილება', function () {
                        showModalWithTableInside(function (head, body, modalEdit) {
                            head.html("ახლის დამატება")
                            dynamicCreateForm(body, "/property/" + currentElement.id, {
                                name: {
                                    name: "სახელი",
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.name
                                },
                                address: {
                                    name: 'მისამართი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.address
                                },
                                space: {
                                    name: 'ფართი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.space
                                },
                                price: {
                                    name: 'ფასი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.price
                                },
                                rooms: {
                                    name: 'ოთახი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.rooms
                                },
                                sleepingRoom: {
                                    name: 'საძინებელი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.sleepingRoom
                                },
                                wetCorner: {
                                    name: 'სველი წერტილი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.wetCorner
                                },
                                parkingPlace: {
                                    name: 'პარკინგი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.parkingPlace
                                },
                                balcony: {
                                    name: 'აივანი',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.balcony
                                },
                                floor: {
                                    name: 'სართული',
                                    type: "text",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.floor
                                },
                                property_description: {
                                    name: 'აღწერა',
                                    type: "textarea",
                                    filter: function (val) {
                                        return val.length > 0
                                    },
                                    value: currentElement.property_description
                                },

                                typeId: {
                                    name: 'ტიპი',
                                    type: "comboBox",
                                    valueField: "id",
                                    nameField: "name",
                                    url: "/property-type/all",
                                    required: true,
                                    value: currentElement.propertyType.id
                                },
                                conditionId: {
                                    name: 'მდგომარეობა',
                                    type: "comboBox",
                                    valueField: "id",
                                    nameField: "name",
                                    url: "/property-condition/all",
                                    required: true,
                                    value: currentElement.propertyCondition.id
                                },
                                cityId: {
                                    name: 'ქალაქი',
                                    type: "comboBox",
                                    valueField: "id",
                                    nameField: "name",
                                    url: "/property-city/all",
                                    required: true,
                                    value: currentElement.propertyCity.id
                                },
                                regionId: {
                                    name: 'უბანი',
                                    type: "comboBox",
                                    valueField: "id",
                                    nameField: "name",
                                    url: "/property-region/all-by-city",
                                    depends: {
                                        field: "cityId",
                                        urlTemplate: "/{cityId}"
                                    },
                                    required: true,
                                    value: currentElement.propertyRegion.id
                                },

                                userBrokerId: {
                                    name: 'ბროკერი',
                                    type: "comboBox",
                                    valueField: "id",
                                    nameField: "name",
                                    url: "/users/all-brokers",
                                    required: true,
                                    value: currentElement.broker.id
                                },
                            }, function (response) {
                                modal.modal("hide")
                                modalEdit.modal("hide")
                                openProperty(response)
                                loadProperties(index, search)

                            }, "PUT");
                        })
                    });
                    createButtonWithHandlerr(actions, 'წაშლა', function () {
                        if (confirm('გსურთ ჩანაწერის წაშლა?')) {

                            $.ajax({
                                url: "/property/delete/" + currentElement.id,
                                method: "DELETE"
                            }).done(function () {
                                modal.modal("hide")
                                loadProperties(index, search);
                            })
                        }
                    });
                    createButtonWithHandlerr(actions, 'ადგილის შეცვლა', function () {
                        showModalWithTableInside(function (head, body, modal2) {


                            body.html('<div><input class="form-control" id="addressText" placeholder="შეიყვანეთ მისამართი">' +
                                '<button id="searchAddress" class="btn btn-blue">ძებნა</button></div>' +
                                '<div id="mapComp" style="width: 500px; height: 400px;"></div>' +
                                '<input type="hidden" id="lng">' +
                                '<input type="hidden" id="ltd">' +
                                '<button id="saveLocation">შენახვა</button>');

                            geocoder = new google.maps.Geocoder();

                            $("#searchAddress").click(function () {
                                var address = $("#addressText").val()
                                geocoder.geocode({'address': address}, function (results, status) {
                                    if (results[0]) {
                                        var location = results[0].geometry.location
                                        /*       var e = {}
                                               e.type = 'change';
                                               $('#ltd').val(location.lat()).trigger('change');
                                               $('#lng').val(location.lng()).trigger('change');*/

                                        $('#mapComp').locationpicker("location", {
                                            latitude: location.lat(),
                                            longitude: location.lng()
                                        });

                                    } else {
                                        alert("მისამართი ვერ მოიძებნა")
                                    }
                                });

                            })

                            $("#saveLocation").click(function () {
                                var ltd = $('#ltd').val();
                                var lng = $('#lng').val();
                                $.ajax({
                                    url: `/property/${currentElement.id}`,
                                    method: 'PUT',
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "JSON",
                                    data: JSON.stringify({
                                        longitude: lng,
                                        latitude: ltd,
                                    }),
                                }).done(function (result) {
                                    modal.modal("hide")
                                    modal2.modal("hide")
                                    loadProperties(index, search)
                                })

                            });
                            $('#mapComp').locationpicker({
                                location: {
                                    latitude: currentElement.latitude,
                                    longitude: currentElement.longitude
                                },
                                radius: 300,
                                inputBinding: {
                                    latitudeInput: $('#ltd'),
                                    longitudeInput: $('#lng')
                                }
                            });
                        }, function () {

                        }, 800, true)

                    })


                    function initMap(currentElement) {

                        map = new google.maps.Map(document.getElementById('map'), {
                            zoom: 13,
                            center: {lat: currentElement.latitude, lng: currentElement.longitude}
                        });
                        google.maps.event.trigger(map, 'resize');

                        geocoder = new google.maps.Geocoder();

                        var image = {
                            url: '/p.png',
                            // This marker is 20 pixels wide by 32 pixels high.
                            size: new google.maps.Size(32, 32),
                            // The origin for this image is (0, 0).
                            origin: new google.maps.Point(0, 0),
                            // The anchor for this image is the base of the flagpole at (0, 32).
                            anchor: new google.maps.Point(0, 32)
                        };

                        var marker = new google.maps.Marker({
                            map: map,
                            animation: google.maps.Animation.DROP,
                            position: {lat: currentElement.latitude, lng: currentElement.longitude},
                            click: function () {

                            }
                        });


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
                        // (function () {
                        //     geocoder.geocode({'address': address}, function (results, status) {
                        //         if (status === 'OK') {
                        //             map.setCenter(results[0].geometry.location);
                        //             var marker = new google.maps.Marker({
                        //                 map: map,
                        //                 animation: google.maps.Animation.DROP,
                        //                 icon: image,
                        //                 position: results[0].geometry.location,
                        //                 click: function () {
                        //                     alert("kaxa")
                        //                 }
                        //             });
                        //             if (type !== 1)
                        //                 marker.addListener('click', function () {
                        //                     DOMElements.modal.modal("hide");
                        //                     startOpeningOrder(object)
                        //                 });
                        //         } else {
                        //
                        //         }
                        //     });
                        // })()

                    }


                    console.log(currentElement);


                }, {}, 1024);
            }
        },
        error: (errMsg) => {

        }
    });
}