
function loadUsers(index, search) {
    var propertyColumns = ["#", "სახელი", 'გვარი', 'ბროკერი'];
    $.ajax({
        type: "GET",
        url: '/users/all-by-pages',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: {
            page: index,
            search: search
        },
        success: (result) => {
            // console.log('aaaaaa--');
            console.log(result.data);
            $("#dataGridHeader").html("");
            $("#dataGridBody").html("");
            $("#paginationUl").html("");
            for (i = 0; i < propertyColumns.length; i++) {
                var currentElement = propertyColumns[i];
                $("#dataGridHeader").append("<th>" + currentElement + "</th>")
            }
            currentData = result.data;
            var dataArray = result.data;
            var totalPages = Math.ceil(result.quantity/10);
            console.log('totalPages----'+totalPages);
            for (i = 0; i < dataArray.length; i++) {
                var currentElement = dataArray[i];
                var checked = '';
                if(currentElement.broker){
                    checked = 'checked';
                }else {
                    checked = '';
                }
                $("#dataGridBody").append(`<tr  value='${i}' class='gridRow ' >
          <td>${currentElement.id}</td>
          <td>${currentElement.firstName}</td>
          <td>${currentElement.lastName}</td>
          <td>
              <div class="checkbox">
                  <label><input type="checkbox" value="" ${checked} dataId='${currentElement.id}'></label>
              </div>
          </td>
          </tr>`
                );
            }

            for (i = 0; i < totalPages; i++) {
                $("#paginationUl").append('<li value="' + i + '" class="paginate_button ' + (index == i ? 'active"' : '') + '"><a href="#">' + (i + 1) + '</a></li>');
            }
            $(".paginate_button").click(function () {
                loadUsers($(this).val(), search)
            });
            $("#addNewDiv").html("");
            // $(".paging_simple_numbers").append("<div class='sendUserData'>send user data</div>");

            $('.sendUserData').show();
            var gridRow = $('.gridRow');
            gridRow.css('cursor', 'pointer');
            gridRow.unbind();

            var checkboxClick = $('.checkbox input');
            let checkBoxData = [];
            checkboxClick.unbind();
            checkboxClick.click(function () {

                if($(this).is(':checked')) {
                    var index = checkBoxData.findIndex(k => k.id == $(this).attr('dataId'));

                    if(index > -1){
                        checkBoxData[index].checkbox = 'true';
                    } else {
                        checkBoxData.push({'id':$(this).attr('dataId'),'checkbox':'true'});
                    }

                } else {
                    var index = checkBoxData.findIndex(k => k.id == $(this).attr('dataId'));

                    if(index > -1){
                        checkBoxData[index].checkbox = 'false';
                    } else {
                        checkBoxData.push({'id':$(this).attr('dataId'),'checkbox':'false'});
                    }
                }


                console.log('checkBoxData----');
                console.log(checkBoxData);
            });

            $('.sendUserData').click(function () {
                console.log('dddddddddd----');
                sendChekcedData(checkBoxData);
            });
        },
        error: (errMsg) => {

        }
    });
}

function sendChekcedData(checkBoxData){
    // var temp = JSON.stringify(checkBoxData);
    // checkBoxData

    $.ajax({
        type: "POST",
        url: '/users/change-role',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(checkBoxData),
        success: (result) => {
            console.log('result---');
            console.log(result);
        },
        error:(errMsg) =>{
            console.log(errMsg);
        }
    });

    // JSON.stringify
}



// $(".checkbox").delegate("input", "click", function(){
//     console.log('ddddddd');
//     if($(this).is(':checked')) {
//         alert('checked');
//     } else {
//         alert('unchecked');
//     }
// });