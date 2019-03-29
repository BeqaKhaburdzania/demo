const filterJson = {
    city: 0,
    region: 0,
    type: 0,
    condition: 0,
    rooms: 0,
    sort: 0,
    spaceStart: '',
    spaceEnd: '',
    priceStart: '',
    priceEnd: '',
    string:'',
    lat:'',
    lng:'',
    distance:'',
    page:0
};
let fullscreen=false;
let center=[41.717097, 44.785254399999985];
let maxPrice = null;
let minPrice = null;
let maxSpace = null;
let minSpace = null;
const url = window.location.href;
let urlCity = null;
let urlSpaceStart = null;
let urlSpaceEnd = null;
let urlPriceStart = null;
let urlPriceEnd = null;
if(url.indexOf('?') >= 0) {
    const queryparams = url.split('?')[1];
    const params = queryparams.split('&');
    let pair = null;
    let urlData = [];

    params.forEach(function (d) {
        pair = d.split('=');
        urlData.push({key: pair[0], value: pair[1]});
    });
    urlCity = urlData[0].value;
    urlSpaceStart = urlData[1].value;
    urlSpaceEnd = urlData[2].value;
    urlPriceStart = urlData[3].value;
    urlPriceEnd = urlData[4].value;

}

const createPopupData = (locations) => {
    for (let i = 0; i < locations.length; i++) {
        let content = document.createElement('div');
        let lttd = document.createElement('span');
        lttd.style.display = 'none';
        lttd.innerHTML = locations[i][4];
        content.id = 'gm_content';
        content.setAttribute('data-toggle', 'modal');
        content.setAttribute('data-target', '#houseModal');
        content.innerHTML = rest.commaSeparatedValue(locations[i][0]); //+ ' <span class="gel-font">a</span>'
        content.appendChild(lttd);
        definePopupClass();
        if (locations.length > 0) {
            popup = new Popup(
                new google.maps.LatLng(locations[i][1], locations[i][2]),
                content);
            popup.setMap(map);
        }
        let dt = document.querySelectorAll('.lttd');
        content.parentNode.parentNode.addEventListener('mouseenter', (e) => {
            let divLttd;
            for (let z = 0; z < dt.length; z++) {
                divLttd = dt[z];

                if (content.childNodes[1].innerHTML === divLttd.innerHTML) {
                    shakeElement(divLttd.parentNode);
                }
            }
        });
        content.parentNode.parentNode.addEventListener('mouseleave', (e) => {
            let divLttd;
            for (let z = 0; z < dt.length; z++) {
                divLttd = dt[z];

                if (content.childNodes[1].innerHTML === divLttd.innerHTML) {
                    divLttd.parentNode.classList.remove('inseted');
                }
            }
        });
        content.parentNode.parentNode.addEventListener('click', (e) => {


            if (iterateHouses(e.target.childNodes[1])) {
                let single_house = new singleHouse();
                let divLttd = iterateHouses(e.target.childNodes[1]);
                single_house.getData(divLttd.getAttribute('data-property_id'), true);
                document.querySelector('#see_single_house').addEventListener('click', (e) => {
                    window.location.href = "house.html?house=" + divLttd.getAttribute('data-property_id');
                });
            }
        });
        document.querySelectorAll('.homeDiv').forEach((element)=>{
            element.addEventListener('mouseenter',(e)=>{
                if(element.getAttribute('target_popup_id')===content.childNodes[1].innerHTML){
                    content.style.padding = "10px";
                }
            });
            element.addEventListener('mouseleave',(e)=>{
                if(element.getAttribute('target_popup_id')===content.childNodes[1].innerHTML){
                    content.style.padding ="";
                }
            });
        });
    }
};


$('#houses_row_small').on('click', '.clickHandler', (event) => {
    let single_house = new singleHouse();
    const id = $(event.target).attr('data-single_target_id');
    single_house.getData(id, true);
    document.querySelector('#see_single_house').addEventListener('click', (e) => {
        window.location.href = "house.html?house=" + id;
    });
});


$(() => {
    getOptions();
    if (url.indexOf('?') >= 0) {
            // const splitted_url = url.split('?')[1].split('&');showHousesFilters
        // console.log(urlSpaceStart,urlSpaceEnd,urlPriceStart,urlPriceEnd);
            filterJson.string = decodeURI(urlCity);
            filterJson.spaceStart = decodeURI(urlSpaceStart);
            filterJson.spaceEnd = decodeURI(urlSpaceEnd);
            filterJson.priceStart = decodeURI(urlPriceStart);
            filterJson.priceEnd = decodeURI(urlPriceEnd);
            $('#string_input').val(decodeURI(urlCity));
            $('#priceRange').val(urlPriceStart+`,`+urlPriceEnd);
            $('#spaceRange').val(urlSpaceStart+`,`+urlSpaceEnd);

            $('#spaceRangeValue').html(`${Math.round(urlSpaceStart)} - ${Math.round(urlSpaceEnd)}  მ<span id="supersquare" class="rangesquare">2</span>`);
            $('#priceRangeValue').html(rest.commaSeparatedValue(Math.round(urlPriceStart))+ ` - ` +rest.commaSeparatedValue(Math.round(urlPriceEnd)) +` <span class="gel-font">a</span>`);

        // urlPriceStart, urlPriceEnd, urlPriceStart, urlPriceEnd
            var sliderAttr = $(this).attr('minspace');

            if (typeof sliderAttr !== typeof undefined && sliderAttr !== false) {
                let minSpace = parseInt($('.sliders').attr('minspace'));
                let maxspace = parseInt($('.sliders').attr('maxspace'));
                let minprice = parseInt($('.sliders').attr('minprice'));
                let maxprice = parseInt($('.sliders').attr('maxprice'));
                newRangeLoad(minSpace, maxspace, minprice, maxprice, urlPriceStart, urlPriceEnd, urlPriceStart, urlPriceEnd);
                // $('#firstSlider').attr('minprice');
                // $('#firstSlider').attr('maxprice');
                // $('#secondSlider').attr('minspace');
                // $('#secondSlider').attr('maxspace');
            }

            console.log('on page first load if index page');
            getData(filterJson);
            if(urlSpaceStart === '' && urlSpaceEnd === '' && urlPriceStart === '' && urlPriceEnd === ''){
                // loadMinMaxVals();
                getSliderRanges();
            }
    } else {
        console.log('on page first load if houeses page');
        getData(filterJson);
    }

    $('#cities').on('change', (event) => {
        const element = event.target;
        const cityId = element.value;
        getDistrictsByCity(cityId)
    });

});
const getRadius=(map)=>{
    const bounds = map.getBounds();
    // if zoom changed
    const center = bounds.getCenter();
    const ne = bounds.getNorthEast();
    // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
    const lat1 = center.lat() / 57.2958;
    const lon1 = center.lng() / 57.2958;
    const lat2 = ne.lat() / 57.2958;
    const lon2 = ne.lng() / 57.2958;
    const NewMapCenter = map.getCenter();
    // distance = circle radius from center to Northeast corner of bounds
    const mathSin = Math.sin(lat1) * Math.sin(lat2);
    const mathCos = Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const mathSInCos = mathSin + mathCos;
    const rad=6371;
    const dis = rad * Math.acos(mathSInCos);
    filterJson.distance=dis;
};
housesMap = (locations, data) => {
    let d = new Date();
    let time = d.getHours();
    let stylers;
    if (time <= 20) {
        stylers = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    } else {
        stylers = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#263c3f"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6b9a76"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#38414e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#212a37"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9ca5b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1f2835"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f3d19c"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2f3948"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#515c6d"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            }
        ]
    }
    let myOptions;
    if (locations.length > 0) {

        myOptions = {
            zoom: 15,
            center: {lat: locations[0][1], lng: locations[0][2]},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: stylers,
        };
    } else {
        myOptions = {
            zoom: 15,
            center: {lat: center[0], lng: center[1]},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: stylers,
        };
    }
    map = new google.maps.Map(document.querySelector('#gm_google_map'),
        myOptions
    );

    google.maps.event.addListenerOnce(map, 'idle', () => {

        // if zoom changed
        google.maps.event.addListener(map, 'zoom_changed', () => {
            filterJson.lat=map.getCenter().lat();
            filterJson.lng=map.getCenter().lng();
            center=[filterJson.lat,filterJson.lng];
            getRadius(map);
            console.log('on google map event zoom_changed');
            getData(filterJson,true);

        });
        // if map dragend
        google.maps.event.addListener(map, 'dragend', () => {
            filterJson.lat=map.getCenter().lat();
            filterJson.lng=map.getCenter().lng();
            center=[filterJson.lat,filterJson.lng];
            getRadius(map);
            getData(filterJson,true);


        });

        filterJson.page = 0;
        // $('.load-more-houeses').attr('data-page-counter', 0);
        // map resize
        google.maps.event.addListener(map, 'resize ', () => {
            filterJson.lat=map.getCenter().lat();
            filterJson.lng=map.getCenter().lng();
            center=[filterJson.lat,filterJson.lng];
            getRadius(map);
            getData(filterJson,true);
        });
    });
}

const getData = (filterOptions,isMap=false) => {
    $.ajax({
        type: "GET",
        url: '/property/search-by-all',
        data: {
            ...filterOptions,
        },
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend() {
            while (document.querySelector('.popup-tip-anchor')) {
                document.querySelector('.popup-tip-anchor').remove();
            }
            $('#propertyCountText').hide();
        },
        success: (data) => {

            // loadMinMaxVals(filterOptions);
            getSliderRanges();
            // call to pagination function
            var paginatinValues = pagination(parseInt(filterOptions.page)+1, Math.ceil(data.quantity/20));

            $('.pagination').empty();
            $('.pagination').append(paginatinValues);
            //

            let mainRowS = document.querySelector('#houses_row_small');
            if (mainRowS) {
                mainRowS.innerHTML = "";

                let locations = [];
                if (data.data.length > 0) {
                    $('#propertyCount').html(data.data.length);
                    $('#propertyCountText').show();
                    for (let i = 0; i < data.data.length; i++) {
                        var pinPrice = 0;
                        if( data.data[i].price != null) {
                            pinPrice = rest.commaSeparatedValue(data.data[i].price);
                        }
                        locations.push([pinPrice, data.data[i].latitude, data.data[i].longitude, 15, data.data[i].id]);
                    }
                    if (isMap === false) {
                        housesMap(locations, data.data);
                    }
                    createHouses(data.data);
                    createPopupData(locations);
                    slideListeners(firstDiv());

                } else {
                    housesMap([], [])
                }

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
};

// houses page counter
// $('.load-more-houeses').on('click',function(){
//     var pageCounter = $(this).attr('data-page-counter');
//     pageCounter++;
//     filterJson.page = pageCounter;
//     $(this).attr('data-page-counter', pageCounter);
//     console.log('on click .load-more-houeses');
//     getData(filterJson)
// });
const createHouses = (data) => {
    data.forEach((datum) => {
        let colliersChoise = (datum.type == 'ბინა')?'<div class="colliers-choise"><img src="img/rcheuli.png"></div>': '';
        let noImage = '';
        let html = '<div  class="col-md-12 homeDiv" target_popup_id="{firstId}">' +
            '<div class="transition row houses_row_left">' +
            '<div class="col-xl-7 px-0">' +
            '<div class="houses_img_wrapper">' +
            colliersChoise +
            '<div class="houses_img_text">' +
            '<div class="span1Wrapper">' +
            '<span class="transition fa fa-angle-left float-left" id="slide-left"></span>' +
            '</div>' +
            '<div class="span2Wrapper">' +
            '<span class="transition fa fa-angle-right float-right" id="slide-right"></span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="imgContainer">' +
            '{images}' +
            '</div>' +
            '</div>' +
            '<div class="col-xl-5">' +
            '<div class="clickHandler"  data-toggle="modal" data-target="#houseModal" data-single_target_id="{id}"></div>' +
            '<div class="houses_col_wrapper">' +
            '<h2>{name}</h2>' +
            '<small>{address}</small>' +
            '<p>{area}</p>' +
            '<p>{price}</p>' +
            '</div>' +
            '</div>' +
            '<div class="lttd" data-property_id="{propertyId}" style="display:none;">{lttd}</div>' +
            '</div>' +
            '<hr id="col_hr">' +
            '</div>';

        //
        const imageHtml = '<img src="{image}" class="housesSlide">';
        html = html.replace('{name}', datum.name);
        html = html.replace('{address}', datum.address);
        html = html.replace('{area}', datum.space+' მ'+'<span id="supersquare">2</span>');
        var dataPrice = 0;
        if(datum.price != null){
            dataPrice = rest.commaSeparatedValue(datum.price);
        }
        html = html.replace('{price}', rest.commaSeparatedValue(dataPrice)+' <span class="gel-font">a</span>');
        html = html.replace('{id}', datum.id);
        html = html.replace('{firstId}', datum.id);

        datum.propertyImages.forEach((image) => {
            const imageLocation = html.indexOf('{images}');
            // var temp = IMAGEURL + image.file;
            // debugger;

            console.log("kaxaLog",`${IMAGEURL}${image.file}/S`)
            const imageElement = imageHtml.replace('{image}', `${IMAGEURL}${image.file}/S`);
            html = html.splice(imageLocation, 0, imageElement);


        });
        if(datum.propertyImages.length == 0){
            // noImage = '';
            html = html.replace('{images}', '<img src="img/no-image.jpg" class="housesSlide">');
        } else {
            html = html.replace('{images}', '');
        }


        html = html.replace('{lttd}', datum.id);
        html = html.replace('{propertyId}', datum.id);

        $('#houses_row_small').append(html);
        const smallHouses = $('#small_houses');
        const main = $('#houses_col');
        const map = $('#map_col');
        const divPos = $('.gm_houses_div');
        const btn = $('#showHousesFilters');
        if (fullscreen) {
            divPos.css('position', 'absolute');
            divPos.css('z-index', 99);
            divPos.css('margin-left', '0');
            divPos.css('transform', 'translateX(-50%)');
            divPos.css('left', '50%');

            map.removeClass().addClass('col-lg-12');
            main.removeClass().addClass('col-lg-12');
            main.css('height', "500px");
            btn.removeClass('fal fa-cog').addClass('fa fa-angle-left');
            map.css('position', 'absolute');
            document.querySelector('.gm_houses_div').style.width = '94%';
            $('.onSmall').removeClass('col-xl-4').addClass('col-xl-2');
            $('.homeDiv').removeClass('col-md-12').addClass('col-md-4 col-sm-6');
            $('.onLarge').removeClass('display-none');
            $('.rg_wrapper').css('width', '95%');
            $('.rg_wrapper').css('margin-left', '30px');
            // $('.sliders').css('width', '100%');
            $('#ranges_4').addClass('rage-slider-left');
            $('#ranges_3').addClass('rage-slider-right');
        } else {
            map.css('position', 'relative');
            divPos.css('position', 'relative');
            divPos.css('z-index', 0);
            divPos.css('transform', 'none');
            divPos.css('left', 'auto');
            divPos.css('margin-left','50px');
            map.removeClass().addClass('col-lg-8');
            main.removeClass().addClass('col-lg-4 text-left');
            main.css('height', '');
            btn.removeClass('fa fa-angle-left').addClass('fal fa-cog')
            document.querySelector('.gm_houses_div').style.width = '100%';
            $('.onSmall').removeClass('col-xl-2').addClass('col-xl-4');
            $('.onLarge').addClass('display-none');
            $('.homeDiv').removeClass('col-md-4').addClass('col-md-12');
            $('.rg_wrapper').css('width', '92%');
            $('.rg_wrapper').css('margin', '0 auto');
            // $('.sliders').css('width', '70%');
            $('#ranges_4').removeClass('rage-slider-left');
            $('#ranges_3').removeClass('rage-slider-right');
        }
    });

    // window.addEventListener('resize', function(event){
    //     if($(window).width()<= 970) {
    //         $('#ranges_4').removeClass('rage-slider-left');
    //         $('#ranges_3').removeClass('rage-slider-right');
    //         $('.sliders').css('width', '70%');
    //     }
    //     else {
    //         $('#ranges_4').addClass('rage-slider-left');
    //         $('#ranges_3').addClass('rage-slider-right');
    //         $('.sliders').css('width', '100%');
    //     }
    // });

};

let plusDivs = (n, e, slideIndex) => {
    let a;
    if (e.target.parentNode.parentNode.parentNode.className === 'col-xl-7 px-0') {
        a = e.target.parentNode.parentNode.parentNode;
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.className === 'col-lg-7 px-0') {
        a = e.target.parentNode.parentNode.parentNode.parentNode;
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.className === 'col-xl-7 px-0') {
        a = e.target.parentNode.parentNode.parentNode.parentNode;
    }

    let element = a.childNodes[1].childNodes;
    for (let i = 0; i < slideIndex.length; i++) {
        if (slideIndex[i].element === element) {
            checkDivs(e, slideIndex[i].slideIndex += n, slideIndex);
        }
    }
};

let slideListeners = (mainElement) => {
    let left = document.querySelectorAll('.span1Wrapper');
    let right = document.querySelectorAll('.span2Wrapper');
    for (let i = 0; i < left.length; i++) {
        left[i].addEventListener('click', (e) => {
            plusDivs(-1, e, mainElement);
        });
    }
    for (let i = 0; i < right.length; i++) {
        right[i].addEventListener('click', (event) => {
            plusDivs(1, event, mainElement);
        });
    }
};

let getDivs = () => {
    let arr = [];
    let x = document.querySelectorAll('.imgContainer');
    for (let i = 0; i < x.length; i++) {
        arr.push(x[i].childNodes);
    }
    return arr;
};

let firstDiv = () => {
    let i;
    let z;
    let x = getDivs();
    let newObject;
    let newArray = [];
    for (i = 0; i < x.length; i++) {
        newArray.push({
            slideIndex: 1,
            element: x[i]
        });
        for (z = 0; z < x[i].length; z++) {
            x[i][z].style.display = "none";
        }
        if (x[i][0] !== undefined) {
            x[i][0].style.display = "block";

        }
    }
    return newArray;
};

let checkDivs = (e, n, mainElement) => {
    let a;
    if (e != null) {
        if (e.target.parentNode.parentNode.parentNode.className === 'col-xl-7 px-0') {
            a = e.target.parentNode.parentNode.parentNode;
        } else if (e.target.parentNode.parentNode.parentNode.parentNode.className === 'col-xl-7 px-0') {
            a = e.target.parentNode.parentNode.parentNode.parentNode;
        } else if (e.target.parentNode.parentNode.className === 'col-xl-7 px-0') {
            a = e.target.parentNode.parentNode;
        }
    }
    for (let v = 0; v < a.childNodes[1].childNodes.length; v++) {
        let element = a.childNodes[1].childNodes;
        for (let i = 0; i < mainElement.length; i++) {
            if (mainElement[i].element === element) {
                if (n > element.length) {
                    mainElement[i].slideIndex = 1
                }
                if (n < 1) {
                    mainElement[i].slideIndex = element.length
                }
                element[v].style.display = "none";
                let l = 0;
                element[mainElement[i].slideIndex - 1].style.display = "block";
                l++;
                element[mainElement[i].slideIndex - 1].style.transition = "opacity 0.2s";
                element[mainElement[i].slideIndex - 1].style.opacity = "0";
                setTimeout(() => {
                    element[mainElement[i].slideIndex - 1].style.opacity = "1";
                });
            }
        }
    }
};


function definePopupClass() {
    Popup = function (position, content) {
        this.position = position;
        content.classList.add('popup-bubble-content');
        let pixelOffset = document.createElement('div');
        pixelOffset.classList.add('popup-bubble-anchor');
        pixelOffset.appendChild(content);
        let anch = document.createElement('div');
        anch.classList.add('popup-tip-anchor');
        anch.appendChild(pixelOffset);
        this.anchor = anch;
    };
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);
    Popup.prototype.onAdd = function () {
        for (let i = 0; i < 3; i++) {
            this.getPanes().floatPane.appendChild(this.anchor);
        }
    };
    Popup.prototype.onRemove = function () {
        if (this.anchor.parentElement) {
            this.anchor.parentElement.removeChild(this.anchor);
        }
    };
    Popup.prototype.draw = function () {
        let divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
        // Hide the popup when it is far out of view.
        let display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';
        if (display === 'block') {
            this.anchor.style.left = divPosition.x + 'px';
            this.anchor.style.top = divPosition.y + 'px';
        }
        if (this.anchor.style.display !== display) {
            this.anchor.style.display = display;
        }
    };
    Popup.prototype.stopEventPropagation = function () {
        let anchor = this.anchor;
        anchor.style.cursor = 'pointer';
        ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart',
            'pointerdown']
            .forEach(function (event) {
                anchor.addEventListener(event, function (e) {
                    e.stopPropagation();
                });
            });
    };
}

shakeElement = (element) => {
    element.classList.add('inseted');
}


iterateHouses = (contCheck) => {
    let dt = document.querySelectorAll('.lttd');
    let divLttd;
    for (let z = 0; z < dt.length; z++) {
        divLttd = dt[z];
        if (divLttd.innerHTML === contCheck.innerHTML) {
            return divLttd;
        }
    }
    return false;
};

const getOptions = () => {
    $.ajax({
        type: "GET",
        url: '/property/allElements',
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            const cities = $('#cities');
            const house_types = $('#house_types');
            const conditions = $('#conditions');

            data.cities.forEach((city) => {
                cities.append(`<option value="${city.id}">${city.name}</option>`)
            });
            data.conditions.forEach((condition) => {
                conditions.append(`<option value="${condition.id}">${condition.name}</option>`)
            });
            data.types.forEach((type) => {
                house_types.append(`<option value="${type.id}">${type.name}</option>`)
            });

        }
    });

};

const getDistrictsByCity = (cityId) => {
    $.ajax({
        type: "GET",
        url: `/property-region/all-by-city/${cityId}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            const districts = $('#districts');
            districts.html('<option value="0">უბანი</option>')
            data.forEach((datum) => {
                districts.append(`<option value="${datum.id}">${datum.name}</option>`)
            })
        }
    });
};
const getHousesByString=(cityName)=>{
    $.ajax({
        type: "GET",
        url: `/property/all-by-str/${cityName}`,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {

        }
    });
}
$('select').on('change', (event) => {
    const element = $(event.target);
    const filterName = element.attr('id');
    if (filterName === 'cities') {
        filterJson.city = element.val();
    } else if (filterName === 'districts') {
        filterJson.region = element.val()
    } else if (filterName === 'house_types') {
        filterJson.type = element.val();
    } else if (filterName === 'conditions') {
        filterJson.condition = element.val();
    } else if (filterName === 'rooms') {
        filterJson.rooms = element.val();
    } else if (filterName === 'sorting') {
        filterJson.sort = element.val();
    }
    filterJson.lat='';
    filterJson.lng='';
    filterJson.distance='';
    console.log('on select change memgoni select opSenia saxlebis gverdze');
    getData(filterJson);
});

$('#string_input').on('input',(event)=>{
    if(event.target.value.length>=3 || event.target.value.length===0){
        filterJson.string=event.target.value;
        filterJson.lat='';
        filterJson.lng='';
        filterJson.distance='';
        getData(filterJson);
    }
});

$('#showHousesFilters').on('click', (event) => {
    fullscreen=!fullscreen;
    console.log('on click #showHousesFilters');
    getData(filterJson);
    if(fullscreen){
        window.addEventListener('resize', function(event){
            if($(window).width() <= 970) {
                $('#ranges_4').removeClass('rage-slider-left');
                $('#ranges_3').removeClass('rage-slider-right');
                $('.sliders').css('width', '70%');
            }
            else{
                $('#ranges_4').addClass('rage-slider-left');
                $('#ranges_3').addClass('rage-slider-right');
                $('.sliders').css('width', '100%');
            }
        });
    }
    else {
        window.addEventListener('resize', function(event){
            $('#ranges_4').removeClass('rage-slider-left');
            $('#ranges_3').removeClass('rage-slider-right');
            $('.sliders').css('width', '70%');
        });
    }

});

function loadMinMaxVal () {

}

// const loadMinMaxVals = (propertyFilters) => {
//     debugger
//     $.ajax({
//         type: "GET",
//         url: '/property/minmax',
//         data: propertyFilters,
//         async: false,
//         enctype: 'multipart/form-data',
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         // beforeSend(){
//         //     newRangeLoad(0, 5000, 0, 1900000, 0, 1900000, 0, 50000);
//         // },
//         success: (data) => {
//             let url = window.location.href;
//             console.log('fffff'+JSON.stringify(data));
//             // debugger;
//             var maxPricePoint, minPricePoint, maxSpacePoint, minSpacePoint;
//
//             $('.sliders').attr('minPrice',data.minPrice);
//             $('.sliders').attr('maxPrice',data.maxPrice);
//             $('.sliders').attr('minSpace',data.minSpace);
//             $('.sliders').attr('maxSpace',data.maxSpace);
//
//
//             if (maxPrice === null && minPrice === null && maxSpace === null && minSpace === null) {
//                 if (urlSpaceStart != null && urlSpaceEnd != null && urlPriceStart != null && urlPriceEnd != null ) {
//                     maxPrice = urlPriceEnd;
//                     minPrice = urlPriceStart;
//                     maxSpace = urlSpaceEnd;
//                     minSpace = urlSpaceStart;
//
//                     if (urlPriceEnd === '') {
//                         maxPrice = data.maxPrice;
//                     }
//
//                     if ( urlPriceStart === '') {
//                         minPrice = data.minPrice;
//                     }
//
//                     if ( urlSpaceEnd === '') {
//                         maxSpace = data.maxSpace;
//                     }
//
//                     if ( urlSpaceStart === '') {
//                         minSpace = data.minSpace;
//                     }
//
//
//                     maxPricePoint = maxPrice*100 / data.maxPrice;
//                     minPricePoint = minPrice*100 / data.maxPrice;
//                     maxSpacePoint = maxSpace*100 / data.maxSpace;
//                     minSpacePoint = minSpace*100 / data.maxSpace;
//
//
//                     $('#priceRange').val(minPricePoint+`,`+maxPricePoint);
//                     $('#spaceRange').val(minSpacePoint+`,`+maxSpacePoint);
//                     $('#spaceRangeValue').html(`${minSpace} - ${maxSpace}  მ<span id="supersquare" class="rangesquare">2</span>`);
//                     $('#priceRangeValue').html(rest.commaSeparatedValue(Math.round(minPrice))+ ` - ` +rest.commaSeparatedValue(Math.round(maxPrice)) +`<span class="gel-font">a</span>`);
//
//                     newRangeLoad(parseInt(data.minSpace), parseInt(data.maxSpace), parseInt(data.minPrice), parseInt(data.maxPrice), parseInt(minPrice), parseInt(maxPrice), parseInt(minSpace), parseInt(maxSpace));
//
//
//                     urlSpaceEnd = null;
//                     urlSpaceStart = null;
//                     urlPriceEnd = null;
//                     urlPriceStart = null;
//                 } else {
//                     maxPrice = data.maxPrice;
//                     minPrice = data.minPrice;
//                     maxSpace = data.maxSpace;
//                     minSpace = data.minSpace;
//
//                     console.log('index load ----');
//                     newRangeLoad(parseInt(minSpace), parseInt(maxSpace), parseInt(minPrice), parseInt(maxPrice), parseInt(minPrice), parseInt(maxPrice), parseInt(minSpace), parseInt(maxSpace));
//                 }
//
//                 // $('#spaceRangeValue').html(`${minSpace} - ${maxSpace}   მ<span id="supersquare" class="rangesquare">2</span>`);
//                 // $('#priceRangeValue').html(rest.commaSeparatedValue(minPrice)+ ` - ` +rest.commaSeparatedValue(maxPrice) +` <span class="gel-font">a</span>`);
//
//
//             }
//             maxPrice = data.maxPrice;
//             minPrice = data.minPrice;
//             maxSpace = data.maxSpace;
//             minSpace = data.minSpace;
//         },
//         error: (errMsg) => {
//             alert.className = 'alert alert-danger text-center';
//             alert.innerHTML = 'მოთხოვნა ვერ შესრულდა';
//             setTimeout(() => {
//                 alert.className = '';
//                 alert.innerHTML = '';
//             }, 1000);
//         }
//     });
// };

// NEW RANGE SLIDER

function createSlide(minVal, MaxVal, slider, step, startPoint, endPoint){
    noUiSlider.create(slider, {
        connect: true,
        behaviour: 'tap',
        start: [startPoint, endPoint],
        step: step,
        range: {
            // Starting at 500, step the value by 500,
            // until 4000 is reached. From there, step by 1000.
            'min': [minVal],
            // '10%': [500, 500],
            // '50%': [4000, 1000],
            'max': [MaxVal]
        }
    });
}

// function newRangeLoad(minSpace, maxSpace, minPrice, maxPrice, priceStartPoint, priceEndPoint, spaceStartPoint, spaceEndPoint) {
//     $(".rangeSliders").each(function (index) {
//         const id = $(this).attr("id");
//         let nonLinearSlider = document.getElementById(id);
//         let max = 0;
//         let min = 0;
//         const url = window.location.href;
//
//             if (id == 'firstSlider') {
//                 // Display the slider value and how far the handle moved
//                 // from the left edge of the slider.
//                 max = maxSpace;
//                 min = minSpace;
//                 createSlide(min, max, nonLinearSlider, 100, spaceStartPoint, spaceEndPoint);
//                 //disable
//                 nonLinearSlider.noUiSlider.on('update', function (values) {
//                     min = values[0];
//                     max = values[1];
//                     $('#spaceRangeValue').html(rest.commaSeparatedValue(Math.round(min)) + ` მ<span id="supersquare" class="rangesquare">2</span> - ` + rest.commaSeparatedValue(Math.round(max)) + ` მ<span id="supersquare" class="rangesquare">2</span>`);
//                     $(".space_range_container").attr("spaceStart", `${Math.round(min)}`);
//                     $(".space_range_container").attr("spaceEnd", `${Math.round(max)}`);
//                     // load data by ranges on houses page
//                     if (url.indexOf('houses') != -1) {
//                         filterJson.spaceStart = Math.round(min - 1);
//                         filterJson.spaceEnd = Math.round(max + 1);
//                         console.log('jandabaaa-----');
//                         getData(filterJson);
//                     }
//                 });
//
//             } else {
//                 // Display the slider value and how far the handle moved
//                 // from the left edge of the slider.
//                 max = maxPrice;
//                 min = minPrice;
//                 createSlide(min, max, nonLinearSlider, 100000, priceStartPoint, priceEndPoint);
//                 nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
//                     min = values[0];
//                     max = values[1];
//                     $('#priceRangeValue').html(rest.commaSeparatedValue(Math.round(min)) + `<span class="gel-font">a</span>  - ` + rest.commaSeparatedValue(Math.round(max)) + ` <span class="gel-font">a</span>`);
//                     $(".price_range_container").attr("priceStart", `${Math.round(min)}`);
//                     $(".price_range_container").attr("priceEnd", `${Math.round(max)}`);
//                     // load data by ranges on houses page
//                     if (url.indexOf('houses') != -1) {
//                         filterJson.priceStart = Math.round(min - 1);
//                         filterJson.priceEnd = Math.round(max + 1);
//                         getData(filterJson);
//                     }
//                 });
//             }
//
//     });
// }


// $('.space_range_container').on('change', '.space_range', (event) => {
//     const min = parseInt($('#spaceRange')[0].value.split(',')[0]);
//     const max = parseInt($('#spaceRange')[0].value.split(',')[1]);
//     const constSub = maxSpace - minSpace;
//     const minStep = constSub * min / 100;
//     const maxStep = constSub * ((100 - max) / 100);
//     const newMin = minSpace + minStep;
//     const newMax = maxSpace - maxStep;
//     filterJson.spaceStart = Math.round(newMin - 1);
//     filterJson.spaceEnd = Math.round(newMax + 1);
//     // getData(filterJson);
//     $('#spaceRangeValue').html(`${Math.round(newMin)} - ${Math.round(newMax)}  მ<span id="supersquare" class="rangesquare">2</span>`);
//     $(".space_range_container").attr("spaceStart", `${Math.round(newMin)}`);
//     $(".space_range_container").attr("spaceEnd", `${Math.round(newMax)}`);
// });
//
// $('.price_range_container').on('change', '.price_range', (event) => {
//     const min = parseInt($('#priceRange')[0].value.split(',')[0]);
//     const max = parseInt($('#priceRange')[0].value.split(',')[1]);
//     const constSub = maxPrice - minPrice;
//     const minStep = constSub * min / 100;
//     const maxStep = constSub * ((100 - max) / 100);
//     const newMin = minPrice + minStep;
//     const newMax = maxPrice - maxStep;
//     filterJson.priceStart = Math.round(newMin - 1);
//     filterJson.priceEnd = Math.round(newMax + 1);
//     console.log(filterJson.priceStart);
//     // getData(filterJson);
//     $('#priceRangeValue').html(rest.commaSeparatedValue(Math.round(newMin))+ ` - ` +rest.commaSeparatedValue(Math.round(newMax)) + ` <span class="gel-font">a</span>`);
//     $(".price_range_container").attr("priceStart", `${Math.round(newMin)}`);
//     $(".price_range_container").attr("priceEnd", `${Math.round(newMax)}`);
// });


var priceSlider;
var spaceSlider;


$(document).ready(function(){
    priceSlider = document.getElementById('secondSlider');
    spaceSlider = document.getElementById('firstSlider');

    createSlide(0, 500, spaceSlider, 100, 0, 500);
    createSlide(0, 1000000, priceSlider, 50000, 0, 1000000);
    getSliderRanges();
});

function getSliderRanges() {
    $.ajax({
        type: "GET",
        url: '/property/minmax?bestype=5&propertyData=0',
        data: null,
        async: false,
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // beforeSend(){
        //     newRangeLoad(0, 5000, 0, 1900000, 0, 1900000, 0, 50000);
        // },
        success: (data) => {
            let url = window.location.href;
            console.log('data---');
            console.log(data);
            var maxPricePoint, minPricePoint, maxSpacePoint, minSpacePoint;
            var propertyImages = '';
            var bestFlatsSlider = '';



            $('.sliders').attr('minPrice',data.minPrice);
            $('.sliders').attr('maxPrice',data.maxPrice);
            $('.sliders').attr('minSpace',data.minSpace);
            $('.sliders').attr('maxSpace',data.maxSpace);


            if (maxPrice === null && minPrice === null && maxSpace === null && minSpace === null) {
                if (urlSpaceStart != null && urlSpaceEnd != null && urlPriceStart != null && urlPriceEnd != null ) {
                    maxPrice = urlPriceEnd;
                    minPrice = urlPriceStart;
                    maxSpace = urlSpaceEnd;
                    minSpace = urlSpaceStart;

                    if (urlPriceEnd === '') {
                        maxPrice = data.maxPrice;
                    }

                    if ( urlPriceStart === '') {
                        minPrice = data.minPrice;
                    }

                    if ( urlSpaceEnd === '') {
                        maxSpace = data.maxSpace;
                    }

                    if ( urlSpaceStart === '') {
                        minSpace = data.minSpace;
                    }


                    maxPricePoint = maxPrice*100 / data.maxPrice;
                    minPricePoint = minPrice*100 / data.maxPrice;
                    maxSpacePoint = maxSpace*100 / data.maxSpace;
                    minSpacePoint = minSpace*100 / data.maxSpace;


                    $('#priceRange').val(minPricePoint+`,`+maxPricePoint);
                    $('#spaceRange').val(minSpacePoint+`,`+maxSpacePoint);
                    // $('#spaceRangeValue').html(`${minSpace} - ${maxSpace}  მ<span id="supersquare" class="rangesquare">2</span>`);
                    // $('#priceRangeValue').html(rest.commaSeparatedValue(Math.round(minPrice))+ ` - ` +rest.commaSeparatedValue(Math.round(maxPrice)) +`<span class="gel-font">a</span>`);

                    // newRangeLoad(parseInt(data.minSpace), parseInt(data.maxSpace), parseInt(data.minPrice), parseInt(data.maxPrice), parseInt(minPrice), parseInt(maxPrice), parseInt(minSpace), parseInt(maxSpace));


                    urlSpaceEnd = null;
                    urlSpaceStart = null;
                    urlPriceEnd = null;
                    urlPriceStart = null;
                    updateSliderRange(data.minSpace, data.maxSpace, spaceSlider, minSpace, maxSpace, 10);
                    updateSliderRange(data.minPrice, data.maxPrice, priceSlider, minPrice, maxPrice, 50000);
                } else {
                    maxPrice = data.maxPrice;
                    minPrice = data.minPrice;
                    maxSpace = data.maxSpace;
                    minSpace = data.minSpace;
                    updateSliderRange(minSpace, maxSpace, spaceSlider, minSpace, maxSpace, 10);
                    updateSliderRange(minPrice, maxPrice, priceSlider, minPrice, maxPrice, 50000);

                    // newRangeLoad(parseInt(minSpace), parseInt(maxSpace), parseInt(minPrice), parseInt(maxPrice), parseInt(minPrice), parseInt(maxPrice), parseInt(minSpace), parseInt(maxSpace));
                }

            }
            maxPrice = data.maxPrice;
            minPrice = data.minPrice;
            maxSpace = data.maxSpace;
            minSpace = data.minSpace;
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

function updateSliderRange(min, max, slider,startPoint, endPoint, step) {
    slider.noUiSlider.updateOptions({
        connect: true,
        behaviour: 'tap',
        start: [startPoint, endPoint],
        step: step,
        range: {
            // Starting at 500, step the value by 500,
            // until 4000 is reached. From there, step by 1000.
            'min': [min],
            // '10%': [500, 500],
            // '50%': [4000, 1000],
            'max': [max]
        }
    });

    let maxVal = 0;
    let minVal = 0;
    const url = window.location.href;

     if (slider.attributes.id.nodeValue == 'firstSlider') {
     // Display the slider value and how far the handle moved
      // from the left edge of the slider.
        maxVal = maxSpace;
        minVal = minSpace;
        slider.noUiSlider.on('update', function (values) {
            minVal = values[0];
            maxVal = values[1];
            $('#spaceRangeValue').html(rest.commaSeparatedValue(Math.round(minVal)) + ` მ<span id="supersquare" class="rangesquare">2</span> - ` + rest.commaSeparatedValue(Math.round(maxVal)) + ` მ<span id="supersquare" class="rangesquare">2</span>`);
            $(".space_range_container").attr("spaceStart", `${Math.round(minVal)}`);
            $(".space_range_container").attr("spaceEnd", `${Math.round(maxVal)}`);
            // load data by ranges on houses page
            if (url.indexOf('houses') != -1) {
                filterJson.spaceStart = Math.round(minVal- 1);
                filterJson.spaceEnd = Math.round(maxVal + 1);

                if(url.indexOf('?') >= 0) {
                    getData(filterJson);
                }

            }

        });
         slider.noUiSlider.on('end', function (values) {
             getData(filterJson);
         });

     } else {
         // Display the slider value and how far the handle move
         // from the left edge of the slider.
         maxVal = maxPrice;
         minVal = minPrice;
         slider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
             minVal = values[0];
             maxVal = values[1];
             $('#priceRangeValue').html(rest.commaSeparatedValue(Math.round(minVal)) + ` <span class="gel-font">a</span>  - ` + rest.commaSeparatedValue(Math.round(maxVal)) + ` <span class="gel-font">a</span>`);
             $(".price_range_container").attr("priceStart", `${Math.round(minVal)}`);
             $(".price_range_container").attr("priceEnd", `${Math.round(maxVal)}`);
             // load data by ranges on houses page
             if (url.indexOf('houses') != -1) {
                 filterJson.priceStart = Math.round(minVal - 1);
                 filterJson.priceEnd = Math.round(maxVal + 1);

                 if(url.indexOf('?') >= 0) {
                     console.log('range slider second');
                     getData(filterJson);
                 }
             }
         });
         slider.noUiSlider.on('end', function (values) {
             getData(filterJson);
         });
     }
}

function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        active = '',
        page = '',
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    if (c > 1){
        page = '<span class="left"><i class="fal fa-angle-left"></i></span>';
        rangeWithDots.push(page);
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('<span>...</span>');
            }
        }

        if(c == i){
            active = 'activePage';
        } else {
            active = '';
        }
        page = '<span dataID="'+(i-1)+'" class="page-numbers '+active+'">'+i+'</span>';
        rangeWithDots.push(page);

        if(i == m){
            page = '<span class="right"><i class="fal fa-angle-right"></i></span>';
            rangeWithDots.push(page);
        }
        l = i;
    }

    return rangeWithDots;
}

$(".pagination").delegate("span", "click", function(){
    var spanClassName = $(this).attr('class');
    var activePageValue = Number($('.pagination').find('.activePage').attr('dataid'));
    console.log('activePageValue');
    console.log(activePageValue);
    if(spanClassName == 'left'){
        filterJson.page = activePageValue - 1;
        console.log('left');
        console.log(filterJson.page);
    } else if(spanClassName == 'right'){
        console.log('right');
        filterJson.page = activePageValue + 1;
        console.log(filterJson.page);
    } else {
        console.log('number');
        filterJson.page = $(this).attr('dataID');
        console.log(filterJson.page);
    }
    getData(filterJson);
});


// function getDataOnPageClick(page) {
//     filterJson.page = page;
//     console.log('on click .load-more-houeses');
//     getData(filterJson)
// }

