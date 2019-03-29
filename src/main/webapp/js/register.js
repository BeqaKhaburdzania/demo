class Register {
    run() {
        let data = {};
        let contactPersonList = [];
        let alrt = document.querySelector('#gm_register_main_alert');
        let company_person = document.querySelector('#gm_company_person');
        let person = document.querySelector('#gm_person');
        let company_person_button = document.querySelector('#gm_register_company_person');
        let person_button = document.querySelector('#gm_register_person');
        let add_contact = document.querySelector('#company_add_contact_btn');
        let show_contacts = document.querySelector('#gm_show_contacts_btn');
        let contactsForm = document.querySelector('#contact_persons_form');
        company_person.style.right = "-2000px";
        person.style.left = "-2000px";
        company_person.style.transition="0.5s";
        person.style.transition="0.5s";
        // Shows user registration
        person_button.addEventListener('click', (e) => {
            if (company_person.style.display != "none") {
                company_person.style.display = "none";
            }
            person.style.display = "block";
            person.style.position = "relative";
            person.style.transition="0.5s";
            company_person.style.position = "relative";
            company_person.style.right = "-2000px";
            setTimeout(() => {
                person.style.left = "0px";
            }, 100);
            e.preventDefault();
        });
        // Shows Company registration
        company_person_button.addEventListener('click', (e) => {
            if (person.style.display != "none") {
                person.style.display = "none";
            }
            company_person.style.display = "block";
            company_person.style.position = "relative";
            person.style.position = "relative";
            person.style.left = "-2000px";
            setTimeout(() => {
                company_person.style.right = "0px";
            }, 100);
            e.preventDefault();
        });
        // Shows Company Contact User Form
        show_contacts.addEventListener('click', (e) => {
            e.preventDefault();
            // this.showContacts(contactsForm);
        });
        // Listens to Company Registration
        document.querySelector('#company_reg_button').addEventListener('click', (e) => {
            data = Object.assign({contactPersonList}, data);
            if (data.contactPersonList.length === 0) {
                alrt.style.display = '';
                alrt.innerHTML = 'გთხოვთ დაამატოთ მომხმარებელი';
                setTimeout(() => {
                    alrt.innerHTML = '';
                    alrt.style.display = 'none';
                }, 2000);
            } else {
                this.companyPersonReg(data, alrt);
                console.log(data);
            }
        });
        // Listenrs to Person Registration
        document.querySelector('#person_reg_button').addEventListener('click', (e) => {
            e.preventDefault();
            this.personReg();
        });
        // Adds new Company Contact User
        add_contact.addEventListener('click', (e) => {
            e.preventDefault();
            this.main(data, contactPersonList);
        });
    }
    personReg() {
        let firstname = document.querySelector('#gm_register_firstname').value;
        let lastname = document.querySelector('#gm_register_lastname').value;
        let password = document.querySelector('#gm_register_password').value;
        let email = document.querySelector('#gm_register_email').value;
        let username = document.querySelector('#gm_register_username').value;
        let phone_number = document.querySelector('#gm_register_phone_number').value;
        let comment = document.querySelector('#gm_register_comment').value;
        let privateNumber = document.querySelector('#gm_register_private_number').value;
        let alrt = document.querySelector('#alert_register_person');
        if (firstname == '' || password == '') {
            alrt.style.display = '';
            alrt.innerHTML = 'შეიყვანეთ ყველა ველი';
            setTimeout(() => {
                alrt.innerHTML = '';
                alrt.style.display = 'none';
            }, 2000);
        }
        else if(!rest.validateEmail(email)){
            document.querySelector('#gm_register_email').style.borderColor="red";
            setTimeout(() => {
                document.querySelector('#gm_register_email').style.borderColor="#ced4da";
            }, 2000);
        } else {
            let object = {
                username: username,
                juridicalName: "",
                juridicalCode: "",
                juridicalRegistrationAddress: "",
                juridicalFieldOfActivity: "",
                passwordDto: password,
                firstName: firstname,
                lastName: lastname,
                email: email,
                phoneNumber: phone_number,
                status: 1,
                activationPreferedMethod: 1,
                countryPhoneIndex: "+995",
                comment: comment,
                personalNumber: privateNumber,
                type: 1,
                contactPersonList: []
            };
            console.log(object)
            this.sendRequest(object,alrt);
        }
    }

    companyPersonReg(data, mainAlert) {
        let juridicalName = document.querySelector('#gm_company_register_name').value;
        let juridicalCode = document.querySelector('#gm_company_register_code').value;
        let juridicalPhoneNumber = document.querySelector('#gm_company_register_phone').value;
        let juridicalEmail = document.querySelector('#gm_company_register_email').value;
        let juridicalAdress = document.querySelector('#gm_company_register_adress').value;
        let juridicalFieldOfActivity = document.querySelector('#gm_company_register_info').value;
        let juridicalPassword = document.querySelector('#gm_company_register_password').value;
        let juridicalComment = document.querySelector('#gm_company_register_comment').value;
        let juridicalUsername = document.querySelector('#gm_company_register_username').value;
     if(!rest.validateEmail(juridicalEmail)) {
         document.querySelector('#gm_company_register_email').style.borderColor = "red";
         setTimeout(() => {
             document.querySelector('#gm_company_register_email').style.borderColor = "#ced4da";
         }, 2000);
     }else
        if (juridicalName != '' && juridicalCode != '' && juridicalPhoneNumber != '' && juridicalEmail != '' && juridicalPassword != '') {
            let company = {
                username: juridicalUsername,
                juridicalName,
                juridicalCode,
                phoneNumber: juridicalPhoneNumber,
                email: juridicalEmail,
                juridicalRegistrationAdress: juridicalAdress,
                juridicalFieldOfActivity,
                comment: juridicalComment,
                countryPhoneIndex: "+995",
                activationPreferedMethod: 1,
                personalNumber: "",
                status: 1,
                firstName: "",
                lastName: "",
                passwordDto: juridicalPassword,
                juridicalComment,
                type: 0,
            };
            data = Object.assign(company, data);
            this.sendRequest(data,mainAlert);
        } else {
            mainAlert.style.display = '';
            mainAlert.innerHTML = 'შეავსეთ ქვემოთ მითითებული ველები';
            setTimeout(() => {
                mainAlert.innerHTML = '';
                mainAlert.style.display = 'none';
            }, 2000);
        }
    }

    sendRequest(object,mainAlert) {
        console.log(object);
        $.ajax({
            type: "POST",
            url: REQUESTURL + '/users/signup',
            data: JSON.stringify(object),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {
                console.log(data);
                rest.setCookie('access_token', data.access_token, 0, data.expires_in);
                rest.setCookie('refresh_token', data.refresh_token, 0, data.expires_in);
                window.location.href = URL + "verification.html";
            },
            error: (errMsg,textStatus) => {
                console.log(errMsg);
                if(errMsg.responseJSON.status===500){
                    mainAlert.innerHTML = errMsg.responseJSON.message;
                    mainAlert.style.display = '';
                    setTimeout(() => {
                        mainAlert.innerHTML = '';
                        mainAlert.style.display = 'none';
                    }, 2000);
                }
            }
        });
    }

    showContacts(contactsForm) {
        switch (contactsForm.style.display) {
            case 'none':
                contactsForm.style.display = '';
                break;
            case '':
                contactsForm.style.display = 'none';
                break;
        }
    }

    addNewContact(contactPersonFirstName, contactPersonLastName, contactPersonEmail, contactPersonPhoneNumber, data, contactPersonPrivateNumber, contactPersonBirthdate, contact_password, contactPersonComment, contactPersonStatus, alrt, contactPersonList) {
        let table = document.querySelector('#contacts_table');
        let tr = document.createElement('tr');
        let td_name = document.createElement('td');
        let td_email = document.createElement('td');
        let td_phone = document.createElement('td');
        let td_delete = document.createElement('td');
        if (this.checkData(contactPersonList, contactPersonEmail)) {
            td_name.innerHTML = contactPersonFirstName;
            td_email.innerHTML = contactPersonEmail;
            td_phone.innerHTML = contactPersonPhoneNumber;
            td_delete.className = 'text-center';
            td_delete.innerHTML = '<a class="transition delete_td">X</a>';
            tr.className = 'contact_tr';
            tr.appendChild(td_name);
            tr.appendChild(td_email);
            tr.appendChild(td_phone);
            tr.appendChild(td_delete);
            table.appendChild(tr);
            let object = {
                contactPersonFirstName,
                contactPersonLastName,
                contactPersonEmail,
                contactPersonPhoneNumber,
                contactPersonPrivateNumber,
                // contactPersonBirthdate,
                // contactPersonComment,
                // contactPersonStatus
            };
            contactPersonList.push(object);
        } else {
            alrt.style.display = '';
            alrt.innerHTML = 'მომხმარებელი ამ ელ.ფოსტით უკვე დამატებულია';
            setTimeout(() => {
                alrt.innerHTML = '';
                alrt.style.display = 'none';
            }, 2000);
        }
        table.addEventListener('click', (e) => {
            for (let i = 0; i < table.children.length; i++) {
                if (table.children[i].className == 'contact_tr') {
                    if (e.target == table.children[i].children[3].firstChild) {
                        for (let x = 0; x < contactPersonList.length; x++) {
                            if (contactPersonList[x].contact_email == e.target.parentNode.parentNode.children[1].innerHTML) {
                                let index = contactPersonList.indexOf(contactPersonList[x]);
                                if (index > -1) {
                                    contactPersonList.splice(index, 1);
                                }
                            }
                        }
                        e.target.parentNode.parentNode.remove();
                    }
                }
            }
        });
        return data;
    }

    checkData(data, contact_email) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].contact_email == contact_email) {
                return false;
            }
        }
        return true;
    }

    main(data, contactPersonList) {
        let contact_name = document.querySelector('#company_contact_firstName');
        let contact_lastName = document.querySelector('#company_contact_lastName');
        let contact_privateNumber = document.querySelector('#company_contact_idnumber');
        let contact_phone = document.querySelector('#company_contact_phone');
        let contact_email = document.querySelector('#company_contact_email');
        let contact_birthDate = document.querySelector('#company_contact_birth_date');
        let contact_password = document.querySelector('#company_contact_password');
        let contact_comment = document.querySelector('#company_contact_comment');
        let contact_status = document.querySelector('#company_contact_status');
        let alrt = document.querySelector('#alert_register');
        if(!rest.validateEmail(contact_email.value)){
            console.log(rest.validateEmail(contact_email.value));
            contact_email.style.borderColor = "red";
            setTimeout(() => {
                contact_email.style.borderColor = "#ced4da";
            }, 2000);
        }else
        if (contact_name.value != '' && contact_privateNumber.value != '' && contact_phone.value != '' && contact_email.value != '') {
            this.addNewContact(contact_name.value, contact_lastName.value, contact_email.value, contact_phone.value, data, contact_privateNumber.value, contact_birthDate.value, contact_password.value, contact_comment.value, contact_status.value, alrt, contactPersonList);
            contact_name.value = '';
            contact_email.value = '';
            contact_phone.value = '';
            contact_privateNumber.value = '';
            contact_birthDate.value = '';
            contact_password.value = '';
            contact_comment.value = '';
            contact_status.value = '';
            contact_lastName.value='';
        } else {
            alrt.style.display = '';
            alrt.innerHTML = 'შეავსეთ ქვემოთ მითითებული ველები';
            setTimeout(() => {
                alrt.innerHTML = '';
                alrt.style.display = 'none';
            }, 2000);
        }
    }
}

if (rest.getCookie('access_token')) {
    window.location.href = URL + "profile.html";
} else {
    let reg = new Register();
    reg.run();
}