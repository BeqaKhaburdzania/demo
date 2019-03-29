$(document).ready(()=> {
    $('body').addClass('loaded');
    setTimeout( ()=> {
        $('#gm_wrap').fadeIn();
    }, 600);
});
/* ------------------- CONSTS ------------------*/
const URL="/";
const REQUESTURL="";
const IMAGEURL='/property/image/';
/* ----------------------------------------------- */
class Rest {
    cookier() {
        $(document).ready(() => {
            let access = this.getCookie('access_token');
            let refresh = this.getCookie('refresh_token');
            if (access !== null) {
                $.ajaxSetup({
                    headers: {
                        'Authorization': 'Bearer ' + access
                    }
                });
            }
            else if (refresh !== null) {
                $.ajax({
                    async: true,
                    crossDomain: true,
                    url: REQUESTURL+"/auth/refresh",
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + refresh
                    },
                    success:  (tokens)=> {
                        setCookie('access_token', tokens.access_token, 0, tokens.expires_in);
                        setCookie('refresh_token', tokens.refresh_token, 0, 3600);
                        $.ajaxSetup({
                            headers: {
                                'Authorization': 'Bearer ' + tokens.access_token
                            }
                        });
                    }
                })
            }
        });
    }
    setCookie(cName, value, exDays, exSeconds) {
        exDays = isNaN(exDays) ? 0 : Number(exDays);
        exSeconds = isNaN(exSeconds) ? 0 : Number(exSeconds);
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + exDays);
        exdate.setSeconds(exdate.getSeconds() + exSeconds);
        let cValue = encodeURI(value);
        if (exDays || exSeconds) cValue += "; expires=" + exdate.toUTCString();
        document.cookie = cName + "=" + cValue;
    }
        getCookie(cName) {
        let i, x, y, arRcookies = document.cookie.split(";");
        for (i = 0; i < arRcookies.length; i++) {
            x = arRcookies[i].substr(0, arRcookies[i].indexOf("="));
            y = arRcookies[i].substr(arRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x === cName) {
                return decodeURI(y);
            }
        }
        return null;
    }
    validateEmail(email) {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validateCookie(){
        if (this.getCookie('access_token')) {
            return true;
        }else{
            return false;
        }
    }
    commaSeparatedValue(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
let rest=new Rest();
rest.cookier();
if(rest.validateCookie()){
    let btn=
        document.querySelectorAll('#gm-top-btn');
    for(let v=0; v<btn.length;v++){
        btn[v].setAttribute('href','/profile.html');
    }
}
String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};