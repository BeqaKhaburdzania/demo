class Verificate{
    main(){
        let alert=document.querySelector('#verification_alert');
        $(document).ready(()=> {
            $.ajax({
                type: "GET",
                url: REQUESTURL + '/users/me',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async:false,
                success:  (data)=> {
                    if (data.smsActive == true) {
                        window.location.href = URL + "profile.html";
                    }
                }
            });
        });
        if(!rest.validateCookie()){
            window.location.href=URL;
        }else {
            this.submitCode(alert);
            this.resendCode(alert);
        }
    }
    submitCode(alert){
        document.querySelector('#gm-verificate').addEventListener('click', (e) => {
            e.preventDefault();
            let code = document.querySelector('#gm_verificate_code').value;
            $.ajax({
                type: "POST",
                url: REQUESTURL+'/users/confirm_code_user_activate',
                data: JSON.stringify({
                    smsCode: code
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (data) => {
                    window.location.href = URL+"profile.html";
                },
                error: (jqXHR, exception)=> {
                    let msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        alert.className='alert alert-danger text-center';
                        alert.innerHTML='თქვენს მიერ მითითებული კოდი არასწორია';
                        setTimeout(()=>{
                            alert.className='';
                            alert.innerHTML='';
                        },2000);
                    } else {
                        msg = "Done";
                        window.location.href = URL+"profile.html";
                    }
                }
            });
        });
    }
    resendCode(alert){
        document.querySelector('#gm_resend_code').addEventListener('click',(e)=>{
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: REQUESTURL+'/users/resend_code',
                data: JSON.stringify({
                    access_token:rest.getCookie('access_token')
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success:()=>{
                    alert.className='alert alert-success text-center';
                    alert.innerHTML='კოდი ხელახლა იქნა გამოგზავნილი თქვენს ნომერზე';
                    setTimeout(()=>{
                        alert.className='';
                        alert.innerHTML='';
                    },2000);
                },
                error: (jqXHR, exception)=> {
                    let msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                    }
                }
            });
        });
    }
}
let verificate=new Verificate();
verificate.main();