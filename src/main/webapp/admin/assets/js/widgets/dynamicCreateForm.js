/**
 * Created by kakha on 8/25/2016.
 */
function dynamicCreateForm(div, url, data, callback, method) {

    if (!method)
        method = "POST";
    var random = Math.floor((Math.random() * 10000) + 1);
    var random2 = Math.floor((Math.random() * 10000) + 1);
    var random3 = Math.floor((Math.random() * 10000) + 1);
    div.append("<div id='div" + random + "" + random2 + "'></div>");
    div = div.find("#div" + random + "" + random2);

    var updatersFunc = {};
    console.log(data);
    for (key in data) {
        var element = data[key];
        if (element.filter || element.required) {
            if (!element.value)
                element.valid = false;
            else {
                element.valid = true;
            }
        } else {
            element.valid = true
        }
        console.log(element);



        if (element.type === "text") {
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='text' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")

            $("#" + key + random).unbind().change(function () {
                var value = $(this).val();
                if (element.filter) {
                    element.valid = element.filter(value)
                    if (!element.valid) {
                        $(this).addClass("reg-invalid");
                    } else {
                        $(this).removeClass("reg-invalid");
                    }
                }


            })

        }
        if (element.type === "textarea") {
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<textarea class='form-control' rows='3' id='" + key + random + "'>" +
                (element.value ? element.value : "") +  "</textarea>" +
                "</div>")

        }
        if (element.type === "number") {

            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='number' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")

        }
        if (element.type === "hidden") {
            div.append("<input value='" + (element.value ? element.value : "") + "' type='hidden' name='" + key + random + "' id='" + key + random + "'/>")
        }
        if (element.type === "date") {
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='date' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")
        }
        if (element.type === "comboBox") {
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<select  data-search='true' class='form-control'   value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
                "</select>" +
                "</div>");
            var localKey = key;
            var localValueField = element.valueField;
            var localNameField = element.nameField;
            var localelement = element;
            if (element.data)
                OuterFuncLocalData(localKey, localValueField, localNameField, random, element, element.data);
            else
                OuterFunc(localKey, localValueField, localNameField, random, element, element.IdToNameMap, updatersFunc);

        }
    }
    div.append("<button class='btn' id='save" + random + "'>შენახვა</button>");
    div.append("<button class='btn' id='cancel" + random + "'>გაუქმება</button>");
    $("#save" + random).click(function () {
        var sendData = {};
        var valid = true;
        for (key in data) {
            if (data[key].type === "date") {
                sendData[key] = moment($("#" + key + random).val().trim()).toDate();
            } else {
                sendData[key] = $("#" + key + random).val().trim();
            }
            valid = data[key].valid;


        }
        if (valid) {
            $.ajax({
                url: url,
                method: method,
                contentType: "application/json; charset=utf-8",
                dataType: "JSON",
                data: JSON.stringify(sendData),
            }).done(function (result) {
                //TODO ეტაპების განახლება ახლის შექმნის შემდეგ

                if (callback)
                    callback(result);
            });
        } else {
            alert("please check values")
        }
    })
    $("#cancel" + random).click(function () {
        callback();
        div.remove();
    })
    for (key in updatersFunc) {
        updatersFunc[key]()
    }
}

function dynamicCreateToArray(div, array, data, callback, afterDraw, beforeDelete) {
    var random = Math.floor((Math.random() * 10000) + 1);
    var random2 = Math.floor((Math.random() * 10000) + 1);
    var random3 = Math.floor((Math.random() * 10000) + 1);
    div.append("<div id='div" + random + "" + random2 + "'></div>");
    div = div.find("#div" + random + "" + random2);

    console.log(data);
    for (key in data) {
        var element = data[key];
        console.log(element);
        if (element.type === "text") {

            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='text' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")

        }
        if (element.type === "number") {

            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='number' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")

        }
        if (element.type === "hidden") {
            div.append("<input value='" + (element.value ? element.value : "") + "' type='hidden' name='" + key + random + "' id='" + key + random + "'/>")
        }
        if (element.type === "date") {
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<input class='form-control' type='date' placeholder='" + element.name + "' value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
                "</div>")
        }
        if (element.type === "comboBox") {
            div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
                "<select  data-search='true' class='form-control'   value='" +
                (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
                "</select>" +
                "</div>");
            var localKey = key;
            var localValueField = element.valueField;
            var localNameField = element.nameField;
            var localelement = element;
            OuterFunc(localKey, localValueField, localNameField, random, element, element.IdToNameMap);
        }
    }
    div.append("<button class='btn' id='save" + random + "'>" + strings["admin_button_save"] + "</button>");
    div.append("<button class='btn' id='cancel" + random + "'>" + strings['admin_button_cancele'] + "</button>");
    $("#save" + random).click(function () {

        var sendData = {};
        for (key in data) {
            if (data[key].type === "date") {
                sendData[key] = moment($("#" + key + random).val().trim()).toDate();
            } else {
                if (data[key].type === "number") {
                    sendData[key] = parseFloat($("#" + key + random).val().trim());
                }
                sendData[key] = $("#" + key + random).val().trim();
            }


        }
        array.push(sendData);
        callback();
        if (beforeDelete) {
            beforeDelete();
        }
        div.remove();
    });
    $("#cancel" + random).click(function () {
        if (beforeDelete) {
            beforeDelete();
        }
        callback();
        div.remove();
    });
    if (afterDraw) {
        afterDraw();
    }
}

function dynamicChooserToCallback(div, data, callback, afterDraw, beforeDelete) {

    var random = Math.floor((Math.random() * 10000) + 1);
    var random2 = Math.floor((Math.random() * 10000) + 1);
    var key = Math.floor((Math.random() * 10000) + 1);
    div.append("<div id='div" + random + "" + random2 + "'></div>");
    div = div.find("#div" + random + "" + random2);
    var element = data;
    console.log(element);
    if (element.type === "text") {

        div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
            "<input class='form-control' type='text' placeholder='" + element.name + "' value='" +
            (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
            "</div>")

    }
    if (element.type === "number") {

        div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
            "<input class='form-control' type='number' placeholder='" + element.name + "' value='" +
            (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
            "</div>")

    }
    if (element.type === "hidden") {
        div.append("<input value='" + (element.value ? element.value : "") + "' type='hidden' name='" + key + random + "' id='" + key + random + "'/>")
    }
    if (element.type === "date") {
        div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
            "<input class='form-control' type='date' placeholder='" + element.name + "' value='" +
            (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "' />" +
            "</div>")
    }
    if (element.type === "comboBox") {
        div.append('<div class="form-group"><label for="' + key + random + '">' + element.name + '</label>' +
            "<select  data-search='true' class='form-control'   value='" +
            (element.value ? element.value : "") + "' name='" + key + "' id='" + key + random + "'>" +
            "</select>" +
            "</div>");
        var localKey = key;
        var localValueField = element.valueField;
        var localNameField = element.nameField;
        var localelement = element;
        OuterFunc(localKey, localValueField, localNameField, random, element, element.IdToNameMap);
    }
    div.append("<button class='btn' id='save" + random + "'>" + strings["admin_button_save"] + "</button>");
    div.append("<button class='btn' id='cancel" + random + "'>" + strings['admin_button_cancele'] + "</button>");
    $("#save" + random).click(function () {
        var sendData = {};
        if (data.type === "date") {
            sendData = moment($("#" + key + random).val().trim()).toDate();
        } else {
            if (data.type === "number") {
                sendData = parseFloat($("#" + key + random).val().trim());
            }
            sendData = $("#" + key + random).val().trim();
        }

        callback(sendData);
        if (beforeDelete) {
            beforeDelete();
        }
        div.remove();
    })
    $("#cancel" + random).click(function () {
        if (beforeDelete) {
            beforeDelete();
        }
        callback(null);
        div.remove();
    })
    if (afterDraw) {
        afterDraw();
    }
}

function OuterFunc(localKey, localValueField, localNameField, random, element, IdToNameMap, updatersFunc) {


    if (element.depends) {
        updatersFunc[element.depends.field] = function () {
            $("#" + localKey + random + "").html("");

            var url = element.url;
            if (element.depends) {
                url += element.depends.urlTemplate.replaceAll("{" + element.depends.field + "}", $("#" + element.depends.field + random + "").val())
            }
            $("#" + localKey + random + "").append('<option value="0">აირჩიეთ მნიშვნელობა</option>')
            $.getJSON(url, function (result) {
                console.log("requested 2")
                console.log(result);
                console.log(localKey);
                for (key2 in result) {
                    if (IdToNameMap) {
                        IdToNameMap[result[key2][localValueField]] = result[key2][localNameField];
                    }
                    $("#" + localKey + random + "").append('<option value="' + result[key2][localValueField] + '">' +
                        result[key2][localNameField] + '</option>')
                }


                $("#" + localKey + random + "").change(function () {


                    if ($(this).val()) {
                        element.valid = true
                    } else {
                        if (element.required) {
                            element.valid = false
                        }
                    }


                    if (updatersFunc[localKey])
                        updatersFunc[localKey]();
                });
                $("#" + localKey + random + "").select2();
                if (element.value) {
                    $("#" + localKey + random + "").val(element.value).trigger('change.select2');

                    $("#" + localKey + random + "").select2("val",element.value);
                }
            })
        };

    } else {
        $("#" + localKey + random + "").html("");
        var url = element.url;
        /*  if(element.depends){
              debugger;
              url+=element.depends.urlTemplate.replaceAll("{"+element.depends.field+"}",$("#"+element.depends.field+random+"").val())
          }*/
        $.getJSON(url, function (result) {
            console.log(result);
            console.log(localKey);
            $("#" + localKey + random + "").append('<option value="' + 0 + '">აირჩიეთ მნიშვნელობა</option>')
            for (key2 in result) {
                if (IdToNameMap) {
                    IdToNameMap[result[key2][localValueField]] = result[key2][localNameField];
                }
                $("#" + localKey + random + "").append('<option value="' + result[key2][localValueField] + '">' +
                    result[key2][localNameField] + '</option>')
            }
            $("#" + localKey + random + "").select2();
            $("#" + localKey + random + "").change(function () {

                if ($(this).val()) {
                    element.valid = true
                } else {
                    if (element.required) {
                        element.valid = false
                    }
                }

                if (updatersFunc[localKey])
                    updatersFunc[localKey]();


            });

            if (element.value) {
                $("#" + localKey + random + "").val(element.value).trigger('change.select2');

                $("#" + localKey + random + "").select2("val",element.value);
            }
            updatersFunc[localKey]()
        })
    }


}

function OuterFuncLocalData(localKey, localValueField, localNameField, random, element, result) {
    for (key2 in result) {
        $("#" + localKey + random + "").append('<option value="' + result[key2][localValueField] + '">' +
            result[key2][localNameField] + '</option>')
    }
    $("#" + localKey + random + "").select2();
}