class singleHouse{
    constructor(){

        this.slideIndex=1;
        if(this.getUrlParams(window.location.search).house===undefined){

        }else {
            this.getData(this.getUrlParams(window.location.search).house.toString());
        }
    }
     getUrlParams(search) {
        let hashes = search.slice(search.indexOf('?') + 1).split('&')
        let params = {}
        hashes.map(hash => {
            let [key, val] = hash.split('=')
            params[key] = decodeURIComponent(val)
        });
        return params
    }
    setDivData(data,checkCall){
            $('#modalTitle').html(data.name);
            document.querySelector('#house_name').innerHTML=data.name;
            document.querySelector('#house_city_region').innerHTML=data.propertyCity.name+','+data.propertyRegion.name;
            document.querySelector('#house_space').innerHTML=data.space+' მ'+'<span style="color:#053499" id="supersquare">2</span>';
            document.querySelector('#house_price').innerHTML=rest.commaSeparatedValue(data.price)+' <span class="gel-font">a</span>';
            if(data.type == 'ბინა') {
                $('.single_house_slider').append('<div class="colliers-choise"><img src="img/rcheuli.png"></div>');
            }
            if(data.broker!==null){
                // document.querySelector('#house_user').innerHTML=data.broker.firstName+ ' ' +data.broker.lastName;
                // if(data.broker.id!==null){
                    document.querySelector('#single_brocker').setAttribute('src','/users/profilePic/' + data.broker.id);
                // }else{
                //     document.querySelector('#single_brocker').setAttribute('src','../img/brokerpic.png');
                // }
                document.querySelector('#house_user').innerHTML=data.broker.firstName+ ' ' +data.broker.lastName;
            }
            let lastSixnumber = data.broker.phoneNumber.toString().slice(-6);
            let formatedBrokerPjoneNumber = `(+995) `+ data.broker.phoneNumber.substring(0, 3)+ ' ' + lastSixnumber.slice(0, 2)+ ' ' + lastSixnumber.slice(2, 4)+ ' ' +lastSixnumber.slice(-2);

            document.querySelector('#house_userPhonenumber').innerHTML=formatedBrokerPjoneNumber;
            document.querySelector('#single_house_steps').innerHTML=data.floor;
            document.querySelector('#single_house_bedroom').innerHTML=data.sleepingRoom;
            document.querySelector('#single_house_wash').innerHTML=data.wetCorner;
            document.querySelector('#single_house_parking').innerHTML= (data.parkingPlace === '' || data.parkingPlace === null || data.parkingPlace === 0 ? 'არა' : 'კი');
            document.querySelector('#single_house_balcony').innerHTML= (data.balcony === '' || data.balcony === null || data.balcony === 0 ? 'არა' : data.balcony); //+' მ'+'<span id="supersquare">2</span>'

        // null
            // document.querySelector('#single_house_repair').innerHTML=data.repair;
            document.querySelector('#single_house_description').innerHTML=data.property_description;
            if(checkCall) {
                let imageSlideDiv=document.querySelector('.singleSlideImagesFull');
                console.log('imageSlideDiv ----');
                console.log(imageSlideDiv);
                if (imageSlideDiv.firstChild) {
                    while (imageSlideDiv.firstChild) {
                        imageSlideDiv.removeChild(imageSlideDiv.firstChild);
                    }
                }

                if(data.propertyImages.length===0) {
                    console.log('images length 0 --');
                    console.log(data.propertyImages);
                    let img = document.createElement('img');
                    img.setAttribute('src', 'img/no-image.jpg');
                    img.className = 'single_house_slide';
                    img.style.transition="0.4s";
                    $('.singleSlideImages').append(img);
                    imageSlideDiv.append(img);
                }else {
                    console.log('images--');
                    console.log(data.propertyImages);
                    for (let i = 0; i < data.propertyImages.length; i++) {
                        let img = document.createElement('img');
                        img.setAttribute('src', IMAGEURL + data.propertyImages[i].file+'/X');
                        img.className = 'single_house_slide';
                        img.style.transition="0.4s";
                        $('.singleSlideImagesFull').append(img);
                        imageSlideDiv.append(img);
                    }
                }
            }else{
                let singleImageSlideDiv=document.querySelector('.singleSlideImagesFull');
                while (singleImageSlideDiv.firstChild) {
                    singleImageSlideDiv.removeChild(singleImageSlideDiv.firstChild);
                }
                if(data.propertyImages.length===0) {
                    console.log('images 10 --');
                    console.log(data.propertyImages);
                    let img = document.createElement('img');
                    img.setAttribute('src', 'img/no-image.jpg');
                    img.className = 'single_house_slide';
                    singleImageSlideDiv.append(img);
                }else {
                    console.log('images 1--');
                    console.log(data.propertyImages);
                    console.log(data.propertyImages.length);
                    console.log('images 1--');
                    for (let i = 0; i < data.propertyImages.length; i++) {
                        let img = document.createElement('img');
                        img.setAttribute('src', IMAGEURL + data.propertyImages[i].file+'/X');
                        img.className = 'single_house_slide';
                        singleImageSlideDiv.append(img);
                    }
                }
            }

    }
     plusDivs(n) {
        this.showDivs(this.slideIndex += n);
    }

     showDivs(n) {
        let i;
        let x = document.querySelectorAll(".single_house_slide");
        if (n > x.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = x.length}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
         x[this.slideIndex-1].style.transition="opacity 0.2s";
         x[this.slideIndex-1].style.opacity="0";
         setTimeout(()=>{
             x[this.slideIndex-1].style.opacity="1";
         });
        x[this.slideIndex-1].style.display = "block";
    }
    setListeners(){
            document.querySelector('#single_slide_left').addEventListener('click',(e)=>{
                this.plusDivs(-1);
            });
            document.querySelector('#single_slide_right').addEventListener('click',(e)=>{
                this.plusDivs(1);
            });
    }
    getData(id,checkCall=false){
        $.ajax({
            type: "GET",
            url: '/property/'+id,
            enctype: 'multipart/form-data',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data) => {
                this.setDivData(data,checkCall);
                this.showDivs(this.slideIndex);
                this.setListeners();
            },
            error: (errMsg) => {
              // window.location.href="houses.html";
            }
        });
    }
}
$(document).ready(()=>{
    const url = window.location.href;
    let single_house=new singleHouse();
    const screenHeight = $(window).height() - 150;
    let imgHeight;
    if($(window).width() >= 988 && url.indexOf('house.html') <= 0){
        imgHeight = screenHeight/2;
    } else if(url.indexOf('house.html') >= 0) {
        imgHeight = screenHeight/1.3;
    }
    $('.img_wrapper').height(imgHeight);

    // single_house_slide
});