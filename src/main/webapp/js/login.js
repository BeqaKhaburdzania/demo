class Login{
    alertDanger(alert){
        alert.className='transition alert alert-danger text-center';
        alert.innerHTML='თქვენი მოთხოვნა ვერ შესრულდა';
        setTimeout(()=>{
            alert.className='';
            alert.innerHTML='';
        },2000);
    }
    alertSuccess(alert){
        alert.className='transition alert alert-success text-center';
        alert.innerHTML='კაბინეტში შესვლა წარმატებით განხორციელდა, მიმდინარეობს გადამისამართება...';
    }
    main() {
        if (!rest.validateCookie()) {
            document.querySelector('#gm-login').addEventListener('click', (e) => {
                e.preventDefault();
                let username = document.querySelector('#gm_login_username').value;
                let password = document.querySelector('#gm_login_password').value;
                let alert = document.querySelector('#gm_login_error');
                $.ajax({
                    type: "POST",
                    url: REQUESTURL + '/auth/login',
                    data: JSON.stringify({
                        username: username,
                        password: password
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: (data) => {
                        rest.setCookie('access_token', data.access_token, 0, data.expires_in);
                        rest.setCookie('refresh_token', data.refresh_token, 0, data.expires_in);
                        this.alertSuccess(alert);
                        setTimeout(() => {
                            window.location.href = URL + "profile.html";
                        }, 2000);
                    },
                    error: (errMsg) => {
                        this.alertDanger(alert);
                    }
                });

            });
        }else{
            window.location.href="profile.html";
        }
}
}
let login=new Login();
login.main();

