class Admin{
    initAdminMap(){
        let myLatlng = new google.maps.LatLng(41.717097, 44.785254399999985);
        let myOptions = {
            zoom:15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        let marker,map;
        let admLatVal=document.querySelector('#admin_latitude');
        let admLongVal=document.querySelector('#admin_longtitude');
        map = new google.maps.Map(document.querySelector(".admin_google_map"), myOptions);
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map
        });
        google.maps.event.addListener(map, "click", (event)=> {
            let clickLat = event.latLng.lat();
            let clickLon = event.latLng.lng();
            admLatVal.value=clickLat;
            admLongVal.value=clickLon;
            let latlng = new google.maps.LatLng(clickLat,clickLon);
            marker.setPosition(latlng);
        });
    }
    setHtml(){
        let add=document.querySelector('#admin_add_house');
        let main=document.querySelector('#admin_content');
        let dashboard=document.querySelector('#admin_dashboard');
        let change=document.querySelector('#admin_edit_houses');
        let addOrUpdate=document.createElement('button');
        addOrUpdate.innerHTML='ბინის დამატება';
        addOrUpdate.className='btn btn-success';
        let content='  <div class="row" id="admin_house_images">\n' +
            '    </div>\n' +
            '<br/>'+
            '<br/>'+
            '<div class="admin_img_upload_div">&nbsp; &nbsp;'+'</div>'+
            '    <section class="admin-section-1">\n' +
            '      <div class="admin_google_map">\n' +
            '      </div>\n' +
            '      <div class="admin-section-1-header">\n' +
            '        <h3 class="text-center">ახალი ბინის დამატება</h3>\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>გრძედი</label>\n' +
            '        <input id="admin_longtitude" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" class="form-control">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>განედი</label>\n' +
            '        <input id="admin_latitude" type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" class="form-control">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>სახელი</label>\n' +
            '        <input type="text" class="form-control"  id="houses_property_name">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>ფასი</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_price">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>კვადრატულობა</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_space">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>ოთახების რაოდენობა</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_rooms">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>სართული</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_floor">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>საძინებელი </label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_sleepingRoom">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>სველი წერტილი</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_wetCorner">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>პარკინგი</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_parkingPlace">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>აივანი</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_balcony">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>რემონტი</label>\n' +
            '        <input type="text" class="form-control" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\.*)\\./g, \'$1\');" id="houses_property_repair">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '        <label>აღწერა</label>\n' +
            '        <input type="text" class="form-control" id="houses_property_description">\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '      <label>ქალაქი</label>\n' +
            '      <select class="form-control input-lg" id="houses_property_city">\n' +

            '      </select>\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '      <label>რეგიონი</label>\n' +
            '    <select class="form-control input-lg"id="houses_property_region">\n' +

            '    </select>\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '      <label>ტიპი</label>\n' +
            '    <select class="form-control input-lg" id="houses_property_type">\n' +

            '    </select>\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '      <label>მდგომარეობა</label>\n' +
            '    <select class="form-control input-lg" id="houses_property_condition">\n' +
            '    </select>\n' +
            '      </div>\n' +
            '      <div class="form-group">\n' +
            '      <div class="wrap_btn">\n' +
            '      </div>\n' +
            '      </div>\n' +
            '    </section>';

        let content2='     <section class="section-admin-2">\n' +
            '           <h1>Upload Images</h1>\n' +
            '           <div class="table-responsive">\n' +
            '               <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">\n' +
            '                   <thead>\n' +
            '                   <tr>\n' +
            '                       <th>სახელი</th>\n' +
            '                       <th>ქალაქი</th>\n' +
            '                       <th>ფასი</th>\n' +
            '                       <th>რეგიონი</th>\n' +
            '                       <th>ტიპი</th>\n' +
            '                       <th>დაედიტება</th>\n' +
            '                       <th>წაშლა</th>\n' +
            '                   </tr>\n' +
            '                   </thead>\n' +
            '                   <tbody id="admin_houses_list">\n' +
            '\n' +
            '                   </tbody>\n' +
            '               </table>\n' +
            '           </div>\n' +
            '       </section>';
        let content3='<h1>Dashboard</h1>';
        let content4='  <div class="list-group" id="admin_cities_list">\n' +
            '            <a href="#" class="list-group-item list-group-item-action active">\n' +
            '                ქალაქები\n' +
            '            </a>\n' +
            '        </div>\n' +
            '        <br/>\n' +
            '        <a href="#" data-toggle="modal" data-target="#crud_parameters" id="admin_add_city">+ ქალაქის დამატება</a>\n' +
            '<br/>'+
            '<div id="admin_edit_cities_panel"'+'</div>'+
            '        <br/>\n' +
            '        <br/>\n' +
            '        <div class="list-group" id="admin_types_list">\n' +
            '            <a href="#" class="list-group-item list-group-item-action active">\n' +
            '                ტიპი\n' +
            '            </a>\n' +
            '        </div>\n' +
            '        <br/>\n' +
            '        <a href="#" id="add_new_type" data-toggle="modal" data-target="#crud_parameters">+ ტიპის დამატება</a>\n' +
            '        <br/>\n' +
            '        <br/>\n' +
            '        <div class="list-group" id="admin_condition_list">\n' +
            '            <a href="#" class="list-group-item list-group-item-action active">\n' +
            '                მდგომარეობა\n' +
            '            </a>\n' +
            '        </div>\n' +
            '        <br/>\n' +
            '        <a href="#" id="add_new_condition" data-toggle="modal" data-target="#crud_parameters">+ მდგომარეობის დამატება</a>\n' +
            '        <br/><br/>\n';
        document.querySelector('#admin_edit_parameters').addEventListener('click',(e)=>{
            main.innerHTML=content4;
            this.getAllParameters();
            this.setParametersListeners();
            e.preventDefault();
        });
        main.innerHTML=content3;
        change.addEventListener('click',(e)=>{
            main.innerHTML=content2;
                this.sendRequest(main,content,addOrUpdate);
            e.preventDefault();

            return false;
        });
        add.addEventListener('click',(e)=>{
          main.innerHTML=content;
            if(document.querySelector('.wrap_btn').children.length>1){
                document.querySelector('.wrap_btn').childNodes[0].remove();
            }
            addOrUpdate.innerHTML='ბინის დამატება';
            addOrUpdate.id='houses_property_button';
            document.querySelector('.wrap_btn').appendChild(addOrUpdate);
            this.addProperty();
            this.initAdminMap();
            this.getDynamicOptions();
            e.preventDefault();
        });
        dashboard.addEventListener('click',(e)=>{
            main.innerHTML=content3;
            e.preventDefault();
        });
    }
    setParametersListeners(){
        let property='';
        let input=document.querySelector('#newParameter');
        let wrapper=document.querySelector('.parametersBtnWrapper');
        document.querySelector('#admin_add_city').addEventListener('click',(e)=>{
            if(document.querySelector('.parameters_add_btn')){
                document.querySelector('.parameters_add_btn').remove();
                input.value=''
            }
            if(document.querySelector('.parameters_remove_btn')){
                document.querySelector('.parameters_remove_btn').remove();
            }
            let btn=document.createElement('button');
            btn.className='transition btn btn-primary parameters_add_btn';
            btn.innerHTML='დამატება';
           wrapper.appendChild(btn);
           btn.addEventListener('click',(e)=>{
               e.preventDefault();
               property='property-city';
                this.addNewParameters(property,{name:input.value});
           });
        });
        document.querySelector('#add_new_type').addEventListener('click',(e)=>{
            if(document.querySelector('.parameters_add_btn')){
                document.querySelector('.parameters_add_btn').remove();
                input.value=''
            }
            if(document.querySelector('.parameters_remove_btn')){
                document.querySelector('.parameters_remove_btn').remove();
            }
            let btn=document.createElement('button');
            btn.className='transition btn btn-primary parameters_add_btn';
            btn.innerHTML='დამატება';
            wrapper.appendChild(btn);
            btn.addEventListener('click',(e)=>{
                e.preventDefault();
                property='property-type';
                this.addNewParameters(property,{name:input.value});
            });
        });
        document.querySelector('#add_new_condition').addEventListener('click',(e)=>{
            if(document.querySelector('.parameters_add_btn')){
                document.querySelector('.parameters_add_btn').remove();
                input.value='';
            }
            if(document.querySelector('.parameters_remove_btn')){
                document.querySelector('.parameters_remove_btn').remove();
            }
            let btn=document.createElement('button');
            btn.className='transition btn btn-primary parameters_add_btn';
            btn.innerHTML='დამატება';
            wrapper.appendChild(btn);
            btn.addEventListener('click',(e)=>{
                e.preventDefault();
                property='property-condition';
                this.addNewParameters(property,{name:input.value});
            });
        });

    }
    putData(updateDataId){
        let price = document.querySelector('#houses_property_price').value;
        let city = document.querySelector('#houses_property_city').value;
        let region = document.querySelector('#houses_property_region').value;
        let type = document.querySelector('#houses_property_type').value;
        let space = document.querySelector('#houses_property_space').value;
        let rooms = document.querySelector('#houses_property_rooms').value;
        let condition = document.querySelector('#houses_property_condition').value;
        let lattitude = document.querySelector('#admin_latitude').value;
        let longtitude = document.querySelector('#admin_longtitude').value;
        let name = document.querySelector('#houses_property_name').value;
        let floor=document.querySelector('#houses_property_floor').value;
        let sleepingRoom=document.querySelector('#houses_property_sleepingRoom').value;
        let parkingPlace=document.querySelector('#houses_property_parkingPlace').value;
        let balcony=document.querySelector('#houses_property_balcony').value;
        let repair=document.querySelector('#houses_property_repair').value;
        let description=document.querySelector('#houses_property_description').value;
        let wetCorner=document.querySelector('#houses_property_wetCorner').value;
            $.ajax({
                type: "PUT",
                url: '/property/'+updateDataId,
                contentType: "application/json; charset=utf-8",
                data:JSON.stringify({
                    name:name,
                    price: price,
                    cityId:city,
                    conditionId:condition,
                    regionId:region,
                    typeId:type,
                    longitude:longtitude,
                    latitude:lattitude,
                    space:space,
                    rooms:rooms,
                    floor:floor,
                    sleepingRoom:sleepingRoom,
                    parkingPlace:parkingPlace,
                    balcony:balcony,
                    repair:repair,
                    property_description:description,
                    wetCorner:wetCorner,
                }),
                dataType: "json",
                success: (data) => {
                    document.querySelector('#admin_edit_houses').click();
                },
                error: (errMsg) => {
                    alert.className = 'alert alert-danger text-center';
                    alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                    setTimeout(() => {
                        alert.className = '';
                        alert.innerHTML = '';
                    }, 1000);
                }
            });
    }
    addProperty(){
        document.querySelector('#houses_property_button').addEventListener('click',(e)=>{
            let name=document.querySelector('#houses_property_name').value;
            let price=document.querySelector('#houses_property_price').value;
            let city=document.querySelector('#houses_property_city').value;
            let region=document.querySelector('#houses_property_region').value;
            let type=document.querySelector('#houses_property_type').value;
            let space=document.querySelector('#houses_property_space').value;
            let rooms=document.querySelector('#houses_property_rooms').value;
            let condition=document.querySelector('#houses_property_condition').value;
            let lattitude=document.querySelector('#admin_latitude').value;
            let longtitude=document.querySelector('#admin_longtitude').value;
            let floor=document.querySelector('#houses_property_floor').value;
            let sleepingRoom=document.querySelector('#houses_property_sleepingRoom').value;
            let parkingPlace=document.querySelector('#houses_property_parkingPlace').value;
            let balcony=document.querySelector('#houses_property_balcony').value;
            let repair=document.querySelector('#houses_property_repair').value;
            let description=document.querySelector('#houses_property_description').value;
            let wetCorner=document.querySelector('#houses_property_wetCorner').value;
            this.propertyAddRequest(name,price,city,condition,region,type,longtitude,lattitude,space,rooms,floor,sleepingRoom,parkingPlace,balcony,repair,description,wetCorner);
            document.querySelector('#admin_edit_houses').click();
        });
    }
    propertyAddRequest(name,price,cityId,conditionId,regionId,typeId,longitude,latitude,space,rooms,floor,sleepingRoom,parkingPlace,balcony,repair,description,wetCorner){
        $.ajax({
            type: "POST",
            url: '/property/add',
            enctype: 'multipart/form-data',
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                name,
                price,
                cityId,
                conditionId,
                regionId,
                typeId,
                longitude,
                latitude,
                space,
                rooms,
                floor,
                sleepingRoom,
                parkingPlace,
                repair,
                property_description:description,
                wetCorner
            }),
            dataType: "json",
            success: (data) => {
            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
    deletePropertyImage(imageId){
        $.ajax({
            type: "DELETE",
            url: '/property/delete-image/'+imageId,
            enctype: 'multipart/form-data',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {


            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
    deleteProperty(propertyId){
        $.ajax({
            type: "DELETE",
            url: '/property/delete/'+propertyId,
            enctype: 'multipart/form-data',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {

            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
    uploadPropertyImage(propertyId) {
        let fuData = document.querySelector('#admin_upload_house_image');
        let FileUploadPath = fuData.value;
        //To check if user upload any file
        if (FileUploadPath == '') {
            console.log("NO FILE UPLOAD PATH");
        } else {
            let Extension = FileUploadPath.substring(
                FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
            //The file uploaded is an image
            if (Extension == "gif" || Extension == "png" || Extension == "bmp"
                || Extension == "jpeg" || Extension == "jpg") {
                if (fuData.files && fuData.files[0]) {
                    let size = fuData.files[0].size / 1024 / 1024;
                    let MAX_SIZE = 2;
                    if (size > MAX_SIZE) {

                    }
                    let form_data = new FormData();
                    form_data.append('file', fuData.files[0]);
                    $.ajax({
                        type: "POST",
                        url: '/property/image/'+propertyId,
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        cache: false,
                        data: form_data,
                        success: (data) => {
                            document.querySelector('#admin_edit_houses').click();
                        },
                        error: (errMsg) => {

                        }
                    });
                }
            }
            //The file upload is NOT an image
            else {
                console.log("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP.");
            }
        }
        fuData.value='';
    }
    parameters(data){
        let cities=document.querySelector('#admin_cities_list');
        let appendTo=document.querySelector('#admin_edit_cities_panel');
        let cont='        <!-- form card login with validation feedback -->\n' +
            '        <div class="card card-outline-secondary">\n' +
            '            <div class="card-header">\n' +
            '                <h3 id="edit_cities_h3" name="" class="mb-0">ქუთაისი</h3>\n' +
            '            </div>\n' +
            '            <div class="card-body">\n' +
            '                <h5>რეგიონები</h5>\n' +
            '                <ul id="admin_cities_regions" class="list-group list-group-flush">\n' +
            '                </ul>\n' +
            '                <br/>\n' +
            '                <a href="#" data-toggle="modal" id="admin_new_region" data-target="#crud_parameters">რეგიონის დამატება</a>\n' +
            '                <br/>\n' +
            '                <br/>\n' +
            '                <form class="form" role="form" autocomplete="off" id="loginForm" novalidate="" method="POST">\n' +
            '                    <div class="form-group">\n' +
            '                        <label for="uname1">სახელის შეცვლა</label>\n' +
            '                        <input type="text" class="form-control" id="inputCityName" required="">\n' +
            '                        <div class="invalid-feedback">Please enter your username or email</div>\n' +
            '                    </div>\n' +
            '                    <button type="submit" class="btn btn-danger btn-lg float-left" id="property_delete_btn">წაშლა</button>\n' +
            '                    <button type="submit" class="btn btn-primary btn-lg float-right" id="property_update_btn">დადასტურება</button>\n' +
            '                </form>\n' +
            '            </div>\n' +
            '            <!--/card-body-->\n' +
            '        </div>\n' +
            '        <!-- /form card login -->';
        let i;
        for( i=0; i<data.cities.length;i++) {
            let a = document.createElement('a');
            a.setAttribute('href', '#');
            a.className = 'list-group-item list-group-item-action';
            a.id = data.cities[i].id;
            a.innerHTML =data.cities[i].name;
            document.querySelector('#admin_cities_list').appendChild(a);
        }
        let z;
        for(z=0; z<data.types.length;z++) {
            let wrapper=document.querySelector('.parametersBtnWrapper');
            let a = document.createElement('a');
            a.setAttribute('href', '#');
            a.className = 'list-group-item list-group-item-action';
            a.innerHTML = data.types[z].name;
            a.setAttribute('name',data.types[z].id);
            a.setAttribute('data-toggle', 'modal');
            a.setAttribute('data-target', '#crud_parameters');
            document.querySelector('#admin_types_list').appendChild(a);
            let input=document.querySelector('#newParameter');
            let dataType=data.types[z];
                a.addEventListener('click', (e) => {
                    if (document.querySelector('.parameters_add_btn')) {
                        document.querySelector('.parameters_add_btn').remove();
                        input.value = ''
                    }
                    if(document.querySelectorAll('.parameters_remove_btn').length>0){
                        document.querySelector('.parameters_remove_btn').remove();
                    }
                    if(e.target.name===dataType.id.toString()) {
                        input.value=dataType.name;
                        let property = 'property-type';
                        let btn = document.createElement('button');
                        btn.className = 'transition btn btn-primary parameters_add_btn';
                        btn.innerHTML = 'დამატება';
                        btn.setAttribute('name', e.target.name);
                        wrapper.appendChild(btn);
                        let deleteBtn = document.createElement('button');
                        deleteBtn.className = 'transition btn btn-danger parameters_remove_btn float-right';
                        deleteBtn.innerHTML = 'წაშლა';
                        deleteBtn.setAttribute('name', e.target.name);
                        wrapper.appendChild(deleteBtn);
                        btn.addEventListener('click', (e) => {
                            if (e.target.name === dataType.id.toString()) {
                                this.updateParameters(property, dataType.id,{name:input.value});
                            }
                            e.preventDefault();
                        });
                        deleteBtn.addEventListener('click', (e) => {
                            if (e.target.name === dataType.id.toString()) {
                                this.removeParameters(property,dataType.id.toString());
                            }
                            e.preventDefault();
                        });
                    }
                });
        }
        for(i=0; i<data.conditions.length;i++ ) {
            let wrapper=document.querySelector('.parametersBtnWrapper');
            let a = document.createElement('a');
            a.setAttribute('href', '#');
            a.className = 'list-group-item list-group-item-action';
            a.innerHTML = data.conditions[i].name;
            a.setAttribute('name',data.conditions[i].id);
            a.setAttribute('data-toggle','modal');
            a.setAttribute('data-target','#crud_parameters');
            document.querySelector('#admin_condition_list').appendChild(a);
            let input=document.querySelector('#newParameter');
            let dataType=data.conditions[i];
            a.addEventListener('click', (e) => {
                if (document.querySelector('.parameters_add_btn')) {
                    document.querySelector('.parameters_add_btn').remove();
                    input.value = '';
                }
                if(document.querySelectorAll('.parameters_remove_btn').length>0){
                    document.querySelector('.parameters_remove_btn').remove();
                }
                if(e.target.name===dataType.id.toString()) {
                    input.value=dataType.name;
                    let property = 'property-condition';
                    let btn = document.createElement('button');
                    btn.className = 'transition btn btn-primary parameters_add_btn';
                    btn.innerHTML = 'დამატება';
                    btn.setAttribute('name', e.target.name);
                    wrapper.appendChild(btn);
                    let deleteBtn = document.createElement('button');
                    deleteBtn.className = 'transition btn btn-danger parameters_remove_btn float-right';
                    deleteBtn.innerHTML = 'წაშლა';
                    deleteBtn.setAttribute('name', e.target.name);
                    wrapper.appendChild(deleteBtn);
                    btn.addEventListener('click', (e) => {
                        if (e.target.name === dataType.id.toString()) {
                            this.updateParameters(property, dataType.id,{name:input.value});
                        }
                        e.preventDefault();
                    });
                    deleteBtn.addEventListener('click', (e) => {
                        if (e.target.name === dataType.id.toString()) {
                            this.removeParameters(property,dataType.id.toString());
                        }
                        e.preventDefault();
                    });
                }
            });
        }
        cities.addEventListener('click',(e)=>{
            if(document.querySelector('.card-outline-secondary')){
                document.querySelector('.card-outline-secondary').remove();
            }
            appendTo.insertAdjacentHTML('beforebegin',cont);
            for(let z=0; z<data.cities.length;z++){
                if(e.target.id===data.cities[z].id.toString()) {
                    let valId=e.target.id;
                    document.querySelector('#admin_new_region').addEventListener('click', (e) => {
                        let input = document.querySelector('#newParameter');
                        let wrapper = document.querySelector('.parametersBtnWrapper');
                        if (document.querySelector('.parameters_add_btn')) {
                            document.querySelector('.parameters_add_btn').remove();
                            input.value = ''
                        }
                        if(document.querySelector('.parameters_remove_btn')){
                            document.querySelector('.parameters_remove_btn').remove();
                        }
                        let btn = document.createElement('button');
                        btn.className = 'transition btn btn-primary parameters_add_btn';
                        btn.innerHTML = 'დამატება';
                        btn.setAttribute('name', valId);
                        wrapper.appendChild(btn);
                        let property = 'property-region';
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.addNewParameters(property, {name: input.value, cityId: e.target.name});
                        });
                    });
                }
                for(let i=0; i<data.regions.length;i++) {
                    let myCityId='';
                    if(data.regions[i].cityId!=null){
                        myCityId=data.regions[i].cityId.toString();
                    }
                    if (e.target.id === myCityId && data.regions[i].cityId.toString()===data.cities[z].id.toString()) {
                        let wrapper=document.querySelector('.parametersBtnWrapper');
                        let a = document.createElement('a');
                        a.setAttribute('href', '#');
                        a.className = 'float-right';
                        a.innerHTML = 'დაედიტება';
                        let li = document.createElement('li');
                        li.className = 'list-group-item';
                        let txt = document.createTextNode(data.regions[i].name);
                        a.setAttribute('data-toggle', 'modal');
                        li.appendChild(txt);
                        li.appendChild(a);
                        a.setAttribute('name',data.regions[i].id.toString());
                        a.setAttribute('data-target', '#crud_parameters');
                        document.querySelector('#admin_cities_regions').appendChild(li);
                        a.addEventListener('click', (e) => {
                            let dataType=data.regions[i];
                            let input=document.querySelector('#newParameter');
                            if (document.querySelector('.parameters_add_btn')) {
                                document.querySelector('.parameters_add_btn').remove();
                                input.value = '';
                            }
                            if(document.querySelectorAll('.parameters_remove_btn').length>0){
                                document.querySelector('.parameters_remove_btn').remove();
                            }
                            if(e.target.name===dataType.id.toString()) {
                                input.value=dataType.name;
                                let property = 'property-region';
                                let btn = document.createElement('button');
                                btn.className = 'transition btn btn-primary parameters_add_btn';
                                btn.innerHTML = 'დაედიტება';
                                btn.setAttribute('name', e.target.name);
                                wrapper.appendChild(btn);
                                let deleteBtn = document.createElement('button');
                                deleteBtn.className = 'transition btn btn-danger parameters_remove_btn float-right';
                                deleteBtn.innerHTML = 'წაშლა';
                                deleteBtn.setAttribute('name', e.target.name);
                                wrapper.appendChild(deleteBtn);
                                btn.addEventListener('click', (e) => {
                                    if (e.target.name === dataType.id.toString()) {
                                        this.updateParameters(property, dataType.id,{name:input.value,cityId:dataType.cityId});
                                    }
                                    e.preventDefault();
                                });
                                deleteBtn.addEventListener('click', (e) => {
                                    if (e.target.name === dataType.id.toString()) {
                                        this.removeParameters(property,dataType.id.toString());
                                    }
                                    e.preventDefault();
                                });
                    }
                    });
                    }
                }
                if(e.target.id===data.cities[z].id.toString()){
                    document.querySelector('#inputCityName').value=data.cities[z].name;
                    document.querySelector('#property_delete_btn').name=data.cities[z].id;
                    document.querySelector('#edit_cities_h3').innerHTML = data.cities[z].name;
                    document.querySelector('#property_delete_btn').addEventListener('click',(e)=>{
                        e.preventDefault();
                        this.removeParameters('property-city',data.cities[z].id.toString());
                    });
                    document.querySelector('#property_update_btn').addEventListener('click',(e)=>{
                        e.preventDefault();
                        this.updateParameters('property-city',data.cities[z].id.toString(),{name:document.querySelector('#inputCityName').value});
                    });
                }
            }
        });
    }
    removeParameters(property,id){
        $.ajax({
            type: "DELETE",
            url: '/'+property+'/delete/'+id,
            contentType: "application/json; charset=utf-8",
            success: (data) => {
                document.querySelector('#admin_edit_parameters').click();
            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
    updateParameters(property,id,dataToSend){
        $.ajax({
            type: "PUT",
            url: '/'+property+'/update/'+id,
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(dataToSend),
            success: (data) => {
                document.querySelector('#newParameter').value='';
                document.querySelector('#admin_edit_parameters').click();
            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
    addNewParameters(property,dataToSend){
        $.ajax({
            type: "POST",
            url: '/'+property+'/add',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data:JSON.stringify(dataToSend),
            success: (data) => {
                document.querySelector('#newParameter').value='';
                document.querySelector('#admin_edit_parameters').click();
            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
    getAllParameters(){
        $.ajax({
            type: "GET",
            url: '/property/allElements',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {
              this.parameters(data);
            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
    addListeners(data,main,content,button) {
        let arr=[];
        let btn = document.querySelectorAll('.admin_update_houses_a');
        button.innerHTML='ბინის შეცვლა';
        button.id='houses_property_edit';
        console.log("Aaaaaaaaaaaa");
        for(let z=0; z<data.length;z++) {
            for (let i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', (e) => {
                    if (e.target.name.toString() === data[z].id.toString()) {
                        main.innerHTML = content;
                        this.getDynamicOptions();
                        for(let x=0; x<data[z].propertyImages.length;x++){
                            let imageCol=document.createElement('div');
                            imageCol.className='col-md-3';
                            imageCol.name=data[z].propertyImages[x].id;
                            let img=document.createElement('img');
                            img.setAttribute('src',IMAGEURL+data[z].propertyImages[x].file);
                            img.className='admin_edit_images';
                            imageCol.appendChild(img);
                            let spn=document.createElement('span');
                            spn.className='fa fa-close updt';
                            spn.id=data[z].propertyImages[x].id;
                            let prnt=e.target.name;
                            spn.addEventListener('click',(e)=>{
                                if(e.target.id===data[z].propertyImages[x].id.toString()){
                                    this.deletePropertyImage(e.target.id);
                                    if(imageCol.name.toString()===e.target.id){
                                        imageCol.remove();
                                    }
                                }
                            });
                            imageCol.appendChild(spn);
                            document.querySelector('#admin_house_images').appendChild(imageCol);
                        }
                        let input=document.createElement('INPUT');
                        input.setAttribute('type','file');
                        input.id='admin_upload_house_image';
                        input.addEventListener('change',(e)=>{
                            this.readURL(input);
                            this.uploadPropertyImage(data[z].id.toString());
                        });
                        document.querySelector('.admin_img_upload_div').appendChild(input);
                        if(document.querySelector('.wrap_btn').children.length>1){
                            document.querySelector('.wrap_btn').childNodes[0].remove();
                        }
                        document.querySelector('.wrap_btn').appendChild(button);
                        this.initAdminMap();
                        document.querySelector('#houses_property_name').value = data[z].name;
                        let name =document.querySelector('#houses_property_name').value;
                            let price = document.querySelector('#houses_property_price').value = data[z].price;
                        let city = document.querySelector('#houses_property_city').value = data[z].propertyCity.id;
                        let region = document.querySelector('#houses_property_region').value = data[z].propertyRegion.id;
                        let type = document.querySelector('#houses_property_type').value = data[z].propertyType.id;
                        let space = document.querySelector('#houses_property_space').value = data[z].space;
                        let rooms = document.querySelector('#houses_property_rooms').value = data[z].rooms;
                        let condition = document.querySelector('#houses_property_condition').value = data[z].propertyCondition.id;
                        let lattitude = document.querySelector('#admin_latitude').value = data[z].latitude;
                        let longtitude = document.querySelector('#admin_longtitude').value = data[z].longitude;
                        let floor=document.querySelector('#houses_property_floor').value=data[z].floor;
                        let wetCorner=document.querySelector('#houses_property_wetCorner').value=data[z].wetCorner;
                        let sleepingRoom=document.querySelector('#houses_property_sleepingRoom').value=data[z].sleepingRoom;
                        let parkingPlace=document.querySelector('#houses_property_parkingPlace').value=data[z].parkingPlace;
                        let balcony=document.querySelector('#houses_property_balcony').value=data[z].balcony;
                        let repair=document.querySelector('#houses_property_repair').value=data[z].repair;
                        let description=document.querySelector('#houses_property_description').value=data[z].property_description;
                        arr=[];
                        arr.push(e.target.name);
                    }
                    e.preventDefault();
                });
            }
        }
        button.addEventListener('click',()=>{
            this.putData(arr[0]);
        });
    }
    sendRequest(main,content,addOrUpdate){
        $.ajax({
            type: "GET",
            url: '/property/search',
            enctype: 'multipart/form-data',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {
                let table=document.querySelector('#admin_houses_list');
                while(table.firstChild){
                    table.removeChild(table.firstChild);
                }
                for(let i=0;i<data.length;i++){

                  this.createTable(data[i].name,data[i].price,data[i].propertyCity.name,data[i].propertyRegion.name,data[i].propertyType.name,data[i].id);
                }
                this.addListeners(data,main,content,addOrUpdate);
            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
    }
     readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            let imageCol=document.createElement('div');
            imageCol.className='col-md-3';
            let img=document.createElement('img');
            img.setAttribute('src','');
            img.className='admin_edit_images';
            imageCol.appendChild(img);
            reader.onload = function (e) {
                img.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
            imageCol.appendChild(img);
            document.querySelector('#admin_house_images').appendChild(imageCol);
        }
    }
    createTable(name,price,city,region,type,id){
        let table=document.querySelector('#admin_houses_list');
        let tr=document.createElement('tr');
        let tdName=document.createElement('td');
        let tdPrice=document.createElement('td');
        let tdCity=document.createElement('td');
        let tdRegion=document.createElement('td');
        let tdType=document.createElement('td');
        let tdDelete=document.createElement('td');
        let tdUpdate=document.createElement('td');
        tdName.innerHTML=name;
        tdPrice.innerHTML=price;
        tdCity.innerHTML=city;
        tdRegion.innerHTML=region;
        tdType.innerHTML=type;
        tdDelete.innerHTML='<a id="'+id+'" href="#">X</a>';
        tdUpdate.innerHTML='<a  href="#" class="admin_update_houses_a" name="'+id+'"'+'>ედიტი</a>';
        tdDelete.addEventListener('click',(e)=>{
                if(e.target.id===id.toString()){
                    this.deleteProperty(id.toString());
                    e.target.parentNode.parentNode.remove();
                }
        });
        tr.appendChild(tdName);
        tr.appendChild(tdCity);
        tr.appendChild(tdPrice);
        tr.appendChild(tdRegion);
        tr.appendChild(tdType);
        tr.appendChild(tdUpdate);
        tr.appendChild(tdDelete);
        table.appendChild(tr);
    }
    getDynamicOptions(){
        let houses_property_city=document.querySelector('#houses_property_city');
        let houses_property_region=document.querySelector('#houses_property_region');
        let houses_property_type=document.querySelector('#houses_property_type');
        let houses_property_condition=document.querySelector('#houses_property_condition');

        let myData;
        $.ajax({
            type: "GET",
            url: '/property/allElements',
            enctype: 'multipart/form-data',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {
                myData=data;
                for(let i=0; i<data.cities.length;i++){
                    let option=document.createElement('OPTION');
                    option.value=data.cities[i].id;
                    option.innerHTML=data.cities[i].name;
                    houses_property_city.appendChild(option);
                }
                for(let i=0; i<data.regions.length;i++){
                    let option = document.createElement('OPTION');
                    let region;
                    if(data.regions[i].cityId!==null){
                        region=data.regions[i].cityId.toString();
                    }
                    if(houses_property_city.childNodes[1].value===region) {
                        option.value = data.regions[i].id;
                        option.innerHTML = data.regions[i].name;
                        houses_property_region.appendChild(option);
                    }
                }
                for(let i=0; i<data.types.length;i++){
                    let option=document.createElement('OPTION');
                    option.value=data.types[i].id;
                    option.innerHTML=data.types[i].name;
                    houses_property_type.appendChild(option);
                }
                for(let i=0; i<data.conditions.length;i++){
                    let option=document.createElement('OPTION');
                    option.value=data.conditions[i].id;
                    option.innerHTML=data.conditions[i].name;
                    houses_property_condition.appendChild(option);
                }
            },
            error: (errMsg) => {
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
        });
        houses_property_city.addEventListener('change',(e)=>{
            if(houses_property_region.firstChild){
                while (houses_property_region.firstChild) {
                    houses_property_region.removeChild(houses_property_region.firstChild);
                }
            }
            for(let i=0; i<myData.regions.length;i++){
                let region;
                if(myData.regions[i].cityId!==null){
                    region=myData.regions[i].cityId.toString();
                }
                if(e.target.value===region){
                    let option = document.createElement('OPTION');
                    option.value = myData.regions[i].id;
                    option.innerHTML = myData.regions[i].name;
                    houses_property_region.appendChild(option);
                }
            }
        });
    }
}
if (rest.validateCookie()) {
    let adminClass=new Admin();
// adminClass.dragDrop();
    adminClass.setHtml();
}else{
    window.location.href="index.html";
}