class Profile {
    main() {
        $(document).ready(()=> {
            if (rest.validateCookie()) {
                let alert = document.querySelector('#gm_profile_alert');
                let status = document.querySelector('#gm_sms_status');
                let email = document.querySelector('#gm_profile_email');
                let name = document.querySelector('#gm_profile_name');
                let phone = document.querySelector('#gm_profile_phone');
                let update_email = document.querySelector('#gm_update_email');
                let update_firstname = document.querySelector('#gm_update_firstName');
                let update_lastName = document.querySelector('#gm_update_lastName');
                let update_phone = document.querySelector('#gm_update_phone');
                let update_comment = document.querySelector('#gm_update_comment');
                let update_status = document.querySelector('#gm_update_status');
                let juridicName = document.querySelector('#juridic_update_name');
                let juridicEmail = document.querySelector('#juridic_update_email');
                let juridicPassword = document.querySelector('#juridic_update_password');
                let juridicAdress = document.querySelector('#juridic_update_adress');
                let juridicPhoneNumber = document.querySelector('#juridic_update_phone');
                let juridicInfo = document.querySelector('#juridic_update_info');
                let juridicComment = document.querySelector('#juridic_update_comment');
                let juridicCode = document.querySelector('#juridic_update_code');
                let userData = {
                    alert,
                    status,
                    email,
                    name,
                    phone,
                    update_email,
                    update_firstname,
                    update_lastName,
                    update_phone,
                    update_comment,
                    update_status,
                    juridicName,
                    juridicEmail,
                    juridicPassword,
                    juridicAdress,
                    juridicPhoneNumber,
                    juridicInfo,
                    juridicComment,
                    juridicCode
                };
                this.getUserInfo(userData);
                // this.deleteUser();
                document.querySelector('#profile_image_upload').addEventListener('change', (e) => {
                    e.preventDefault();
                    this.ValidateFileUpload(alert);
                });
                this.logout();
                this.updateUserInfo(userData);
                this.updateJuridicInfo(userData);
                this.updateUserPassword(alert);
            } else {
                window.location.href = "login.html";
            }
        });
    }
    setJuridicUserData(name,juridicPhoneNumber,juridicEmail,juridicName,juridicCode,juridicAdress,juridicInfo,juridicComment,data){
        document.querySelector('#person_profile_form').innerHTML = '';
        name.innerHTML = "Hello " + data.juridicalName;
        juridicPhoneNumber.value = data.phoneNumber;
        juridicEmail.value = data.email;
        juridicName.value = data.juridicalName;
        juridicCode.value = data.juridicalCode;
        juridicAdress.value = data.juridicalRegistrationAddress;
        juridicComment.value = data.comment;
        juridicInfo.value=data.juridicalFieldOfActivity;
        this.table(data);
    }
    setUserData(name,update_email,update_firstname,update_lastName,update_phone,update_comment,data){
        document.querySelector('#juridic_profile_form').innerHTML = '';
        name.innerHTML = "Hello " + data.firstName + " " + data.lastName;
        update_email.value = data.email;
        update_firstname.value = data.firstName;
        update_lastName.value = data.lastName;
        update_phone.value = data.phoneNumber;
        update_comment.value = data.comment;
    }
    getUserInfo(user){
        $.ajax({
            type: "GET",
            url: REQUESTURL + '/users/me',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {
                console.log(data);
                user.email.innerHTML = '&nbsp; ' + data.email;
                user.phone.innerHTML = '&nbsp; ' + data.phoneNumber;
                if(data.pictureId===null){
                    document.querySelector('#profile_image').setAttribute('src', 'http://simpleicon.com/wp-content/uploads/user1.png' );
                }else{
                document.querySelector('#profile_image').setAttribute('src', REQUESTURL + '/users/profilePic/' + data.id);
                }
                if (data.type !== 'PHYSICAL_USER') {
                    this.setJuridicUserData(user.name,user.juridicPhoneNumber,user.juridicEmail,user.juridicName,user.juridicCode,user.juridicAdress,user.juridicInfo,user.juridicComment,data);
                    this.registerNewContactPerson();
                } else {
                    this.setUserData(user.name,user.update_email,user.update_firstname,user.update_lastName,user.update_phone,user.update_comment,data);
                }
                if (data.smsActive == true) {
                    user.status.classList.add("btn-success");
                    user.status.innerHTML = "სმს ვერიფიცირებული";
                }
                if (data.smsActive == false) {
                    user.status.classList.add("btn-danger");
                    user.status.innerHTML = "არარის ვერიფიცირებული";
                    user.status.href = URL + 'verification.html';
                }
            },
            error: (errMsg) => {
                this.logout();
            }
        });
    }
    registerNewContactPerson(){
        let firstname=document.querySelector('#new_contactPersonFirstName');
        let lastname=document.querySelector('#new_contactPersonLastName');
        let email=document.querySelector('#new_contactPersonEmail');
        let phone_number=document.querySelector('#new_contactPersonPhoneNumber');
        let private_number=document.querySelector('#new_contactPersonPrivateNumber');
        document.querySelector('#add_new_contact').addEventListener('click',(e)=>{
            e.preventDefault();
            if(firstname.value!='' && lastname.value!='' && email.value!='' && phone_number.value!='' && private_number.value!=''){
                $.ajax({
                    type: "POST",
                    url: REQUESTURL + '/users/add-contact-person',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({
                        contactPersonFirstName :firstname.value,
                        contactPersonLastName: lastname.value,
                        contactPersonEmail: email.value ,
                        contactPersonPhoneNumber:phone_number.value,
                        contactPersonPrivateNumber:private_number.value
                    }),
                    success: () => {
                        window.location.href='/profile.html';

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
        });
    }
    logout() {
        document.querySelector('#gm_logout').addEventListener('click', (e) => {
            e.preventDefault();
            document.cookie = 'access_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
            document.cookie = 'refresh_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href = URL;
        });
    }
    updateUserInfo(user) {
        document.querySelector('#gm_update_userInfo').addEventListener('click', (e) => {
            if (!rest.validateEmail(user.update_email.value)) {
                user.update_email.style.borderColor = "red";
                setTimeout(() => {
                    user.update_email.style.borderColor = "#ced4da";
                }, 2000);
            } else {
                this.putData('', '', '', user.update_email.value, user.update_firstname.value, user.update_lastName.value, user.update_phone.value, user.update_comment.value);
            }
            e.preventDefault();
        });
    }
    table(data) {
        let table = document.querySelector('#company_users_table');
        for (let i = 0; i < data.contactPersonList.length; i++) {
            let tr = document.createElement('tr');
            let td_name = document.createElement('td');
            let td_email = document.createElement('td');
            let td_phone = document.createElement('td');
            let td_delete = document.createElement('td');
            td_name.innerHTML = data.contactPersonList[i].contactPersonFirstName + ' ' + data.contactPersonList[i].contactPersonLastName;
            td_email.innerHTML = data.contactPersonList[i].contactPersonEmail;
            td_phone.innerHTML = data.contactPersonList[i].contactPersonPhoneNumber;
            td_delete.className = 'text-center';
            tr.className = 'juridic_contact_tr';
            td_delete.innerHTML = '<a style="cursor:pointer" href="#" name="'+data.contactPersonList[i].id+'" class="transition delete_td">X</a>';
            tr.appendChild(td_name);
            tr.appendChild(td_email);
            tr.appendChild(td_phone);
            tr.appendChild(td_delete);
            td_delete.addEventListener('click',(e)=>{
                console.log(e.target.name);
                console.log(data.contactPersonList[i].id);
                if(e.target.name===data.contactPersonList[i].id.toString()){
                    this.deleteUser(e.target.name);
                }
            });
            table.appendChild(tr);
            table.addEventListener('click', (e) => {
                for (let i = 0; i < table.children.length; i++) {
                    if (table.children[i].className == 'juridic_contact_tr') {
                        if (e.target == table.children[i].children[3].firstChild) {
                            e.target.parentNode.parentNode.remove();
                        }
                    }
                }
            });
        }
    }
    updateJuridicInfo(user) {
        document.querySelector('#gm_update_juridic_info').addEventListener('click', (e) => {
            if (!rest.validateEmail(user.juridicEmail.value)) {
                user.juridicEmail.style.borderColor = "red";
                setTimeout(() => {
                    user.juridicEmail.style.borderColor = "#ced4da";
                }, 2000);
            } else {
                this.putData(user.juridicName.value, user.juridicCode.value, user.juridicAdress.value, user.juridicEmail.value, '', '', user.juridicPhoneNumber.value, user.juridicComment.value,user.juridicInfo.value);
            }
            e.preventDefault();
        });
    }
    putData(juridicName, juridicCode, juridicRegistrationAdress, email, firstName, lastName, phoneNumber, comment,juridicInfo) {
        console.log(juridicInfo);
        $.ajax({
            type: "PUT",
            url: REQUESTURL + '/users',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                status: "ACTIVE",
                createdAt: 1523621734000,
                juridicalRegistrationAddress: juridicRegistrationAdress,
                juridicalName: juridicName,
                juridicalCode: juridicCode,
                juridicalFieldOfActivity: juridicInfo,
                firstName: firstName,
                lastName: lastName,
                email: email,
                comment: comment,
                phoneNumber: phoneNumber,
                countryPhoneIndex: "+995",
                authIds: null,
                activationPreferedMethod: 1,
                authorities: [
                    {
                        authority: "ROLE_ADMIN"
                    },
                    {
                        authority: "ROLE_USER"
                    }
                ]
            }),
            success: (data) => {
                alert.className = 'alert alert-success text-center';
                alert.innerHTML = 'მონაცემები წარმატებით შეიცვალა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                    window.location.href = URL + "profile.html";
                }, 1000);
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
    updateUserPassword(alert) {
        document.querySelector('#gm_new_pass').addEventListener('click', (e) => {
            let oldpass = document.querySelector('#gm_update_password').value;
            let newpass = document.querySelector('#gm_update_new_password').value;
            if(oldpass!='' && newpass!='') {
                $.ajax({
                    type: "POST",
                    url: REQUESTURL + '/auth/change_password',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({
                        oldPassword: oldpass,
                        newPassword: newpass
                    }),
                    success: () => {
                        // alert("პაროლი წარმატებით შეიცვალა,გთხოვთ შეხვიდეთ თავიდან");
                        document.cookie = 'access_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
                        document.cookie = 'refresh_token' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        window.location.href = URL + 'login.html';
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
            }else{
                alert.className = 'alert alert-danger text-center';
                alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
                setTimeout(() => {
                    alert.className = '';
                    alert.innerHTML = '';
                }, 1000);
            }
            e.preventDefault();
        });
    }
    ValidateFileUpload(alert) {
        let fuData = document.querySelector('#profile_image_upload');
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
                    console.log(fuData.files[0]);
                    console.log(form_data);
                    $.ajax({
                        type: "POST",
                        url: '/users/profilePic',
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        cache: false,
                        data: form_data,
                        success: (data) => {
                            document.querySelector('#profile_image').setAttribute('src', REQUESTURL + '/users/profilePic/' + data.id);
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
            }
            //The file upload is NOT an image
            else {
                console.log("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
            }
        }
        fuData.value='';
    }
    deleteUser(deleteId) {
        $.ajax({
            type: "DELETE",
            url: 'users/delete-contact-person/'+deleteId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {
                console.log("Deleted");
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
}
let profile=new Profile();
profile.main();


