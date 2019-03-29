let BgsliderImages = '';
var bestFlatsSlider = '';
// const url = window.location.href;
initMap=()=>{
    let locations = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    let map = new google.maps.Map(document.getElementById('gm_google_map'), {
        zoom: 14,
        center: new google.maps.LatLng(41.717097, 44.785254399999985),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "24"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 65
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "-13"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": "50"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": "-100"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "100"
                    },
                    {
                        "lightness": "100"
                    },
                    {
                        "gamma": "1.75"
                    },
                    {
                        "weight": "3.81"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "saturation": "-34"
                    },
                    {
                        "lightness": "-31"
                    },
                    {
                        "gamma": "2.48"
                    },
                    {
                        "weight": "3.52"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "30"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffff00"
                    },
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -97
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-59"
                    },
                    {
                        "lightness": "36"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "lightness": -25
                    },
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": "-21"
                    },
                    {
                        "lightness": "-3"
                    },
                    {
                        "gamma": "0.94"
                    }
                ]
            }
        ]
    });

    let infowindow = new google.maps.InfoWindow();

    let marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(41.717097, 44.785254399999985),
            map: map,
            icon: 'img/blue-pin.png'
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent('Colliers International');
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
let  header = document.querySelector('#gm_top_nav');
let  sticky = header.offsetTop+300;
let  header_area=$('.gm_main_header');
let  main_area=$('.gm_nav_section');

    $(document.body).scroll(function() {

        // console.log($(this).scrollTop());
        if (main_area.hasClass('sticky') && ($(this).scrollTop() <= 400 || $(this).width() <= 750)) {
            main_area.removeClass('sticky').appendTo(header_area);

        } else if (!main_area.hasClass('sticky') && $(this).width() > 750 && $(this).scrollTop() > 400) {
            header_area.css('height', header_area.height());
            main_area.css({'opacity': '0', 'top': '-100px'}).addClass('sticky');
            main_area.appendTo($('body')).animate({'opacity': 1, 'top': '0px'});
        }
    });

    // index page search on keyup
    $("#index_search_input").keyup(function(e) {

        if(e.keyCode != 40 && e.keyCode != 38) {
            let keyUpVals = $(this).val();
            $.ajax({
                type: "GET",
                url: "/property/getSuggestions",
                data: {string: keyUpVals},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: (data) => {
                    var length = data.length;
                    if (length > 5) {
                        length = 5;
                    }
                    $('.suggested-search').empty();
                    var activeClass = "";
                    for (var i = 0; i < length; i++) {
                        if (i == 0) {
                            activeClass = 'class="active"';
                        } else {
                            activeClass = 'class=""';
                        }
                        var string = '<span ' + activeClass + '>' + data[i] + '</span>';
                        $('.suggested-search').append(string);
                    }
                }
            });
            $('.suggested-search').show();
        }

    });

    $(".suggested-search").delegate("span", "click", function(){
        $("#index_search_input").val($(this).html());

        $('.suggested-search').hide();
        $('.suggested-search').empty();

    });


    $(document).mouseup(function(e) {
        var container = $("#index_search_input");
        var containerSecond = $(".suggested-search");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0  && !containerSecond.is(e.target) && containerSecond.has(e.target).length === 0)
        {
            $('.suggested-search').hide();
            $('.suggested-search').empty();
        }
    });

    //

$( document ).ready(function() {
    // Bootstrap Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //
    const url = window.location.href;

    if(url.indexOf('index') != -1){
        $('body').attr('page', 'index');
    }
    //load  slider images
    $.ajax({
        type: "GET",
        url: '/background/1',
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend() {
            // request.setRequestHeader("Authority", authorizationToken);
        },
        success: (data) => {
            // backgroundID = data['backgroundImages'][0].id;
            if(data['backgroundImages'].length > 1){
                // console.log(data['backgroundImages'].length);
                for(let i=0; i < data['backgroundImages'].length; i++){
                    BgsliderImages += `<div style="background-image: url(/background/image/${data['backgroundImages'][i].id})"></div>`;
                }
            } else if(data['backgroundImages'].length == 1) {
                BgsliderImages = `<div style="background-image: url(/background/image/${data['backgroundImages'][0].id})"></div>`;
            } else {
                BgsliderImages = '<div style="background-image: url("img/no-image.jpg")"></div>';
            }
            console.log(BgsliderImages);
            $('#main-slider .owl-carousel').append(BgsliderImages);

        }
    });

    if(url.indexOf('index') >= 0) {
        $.ajax({
            type: "GET",
            url: '/property/minmax?bestype=5&propertyData=1',
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
                let innerSlider = '';
                if (url.indexOf('index') >= 0) {
                    for (var i = 0; i < data.best.length; i++) {
                        propertyImages = '';
                        innerSlider = '';
                        if(data.best[i].propertyImages.length > 1){
                            for (var j = 0; j < data.best[i].propertyImages.length; j++) {

                                propertyImages += `<div style="background-image: url(/property/image/${data.best[i].propertyImages[j].file}/S)"></div>`;
                            }

                            innerSlider = `<div class="owl-carousel" DataItems="1" dataMargin="10" dataAutoHeight="false" dataNav="true" dataAutoplay="false"
                                               dataAutoPlaySpeed="4000" dataAutoPlayTimeout="2000" dataAutoplayHoverPause="true" dataLoop="true" dataMouseDrag="true"
                                               dataTouchDrag="true" dataPullDrag="true" dataResponsiveItemSmall="1" dataResponsiveItemMedium="1"
                                               dataResponsiveItemBig="1" dataResponsiveSmallNav="true" dataResponsiveMediumNav="true" dataResponsiveBigNav="true">
                                               ` + propertyImages + `
                                          </div>`;
                        } else if(data.best[i].propertyImages.length == 1){
                            innerSlider = `<div class="single-image" style="background-image: url(/property/image/${data.best[i].propertyImages[0].file}/S)"></div>`;
                        } else {
                            innerSlider = '<div class="single-image" style="background-image:url(img/no-image.jpg)"></div>';
                        }

                        bestFlatsSlider += `
                                    <div>
                                      <div class="flat-images">
                                          <div class="colliers-choise"><img src="img/rcheuli.png"></div>
                                         
                                          `+innerSlider+`
                                      </div>
                                      <h5>` + data.best[i].name + `</h5>
                                      <h5>` + data.best[i].city + `</h5>
                                      <p>` + data.best[i].space + ` მ<span id="supersquare" class="rangesquare">2</span></p>
                                      <p>` + rest.commaSeparatedValue(data.best[i].price) + ` <span class="gel-font">a</span></p>
                                      <div class="flat-icons-div">
                                              <span class="flat-icon">
                                                  <img src="img/icwater.png" alt="">
                                                  <span>` + data.best[i].wetCorner + `</span>
                                              </span>
                                              <span class="flat-icon">
                                                  <img src="img/icbed.png" alt="">
                                                  <span>` + data.best[i].sleepingRoom + `</span>
                                              </span>
                                              <span class="flat-icon">
                                                <img src="img/icsteps.png" alt="">
                                                  <span>` + data.best[i].floor + `</span>
                                              </span>
                                          </div>
                                      <span class="flat-detail-button clickHandler" data-toggle="modal" data-target="#houseModal" data-single_target_id="` + data.best[i].id + `">დეტალურად<i class="fa fa-chevron-right"></i></span>
                                    </div>`;
                    }

                }

                $('#flats-slider .owl-carousel').append(bestFlatsSlider);
            }
        });
    }


});

$(document).keydown(function(e) {
    let suggestedSearchValLength = $('.suggested-search').find('span').length;
    // console.log($('.suggested-search span').first().hasClass('active'));
    if(suggestedSearchValLength > 0) {

        // if (!($('.suggested-search').find('.active'))){
        //     $('.suggested-search span').first().addClass('active');
        // }

        // console.log('length');
        // console.log(suggestedSearchValLength);
        if (e.keyCode == 40) {
            // console.log(40);
            console.log($('.suggested-search span').first().hasClass('active'));
            if ($('.suggested-search span').first().hasClass('active')) {
                console.log("40-is  if-ia");

                $('.suggested-search').find('.active').removeClass('active').next('span').addClass('active');
            } else if ($('.suggested-search span').last().hasClass('active')) {
                console.log("40-is  elseif-ia");

                $('.suggested-search span').removeClass('active');
                $('.suggested-search span').first().addClass('active');
            } else {
                $('.suggested-search').find('.active').removeClass('active').next('span').addClass('active');
            }
        } else if (e.keyCode == 38) {

            // console.log(38);
            if ($('.suggested-search span').last().hasClass('active')) {
                console.log("38-is  if-ia");

                $('.suggested-search').find('.active').removeClass('active').prev('span').addClass('active');
            } else if ($('.suggested-search span').first().hasClass('active')) {
                console.log("38-is  elseif-ia");

                $('.suggested-search span').removeClass('active');
                $('.suggested-search span').last().addClass('active');
            } else {
                $('.suggested-search').find('.active').removeClass('active').prev('span').addClass('active');
            }
        }
    }
    // } else if(suggestedSearchValLength == 0 && e.keyCode == 40){
    //     if($('.suggested-search span').first().hasClass('active')){
    //         $('.suggested-search span').last().addClass('active');
    //     } else {
    //         $('.suggested-search span').removeClass('active');
    //         $('.suggested-search span').first().addClass('active');
    //     }
    //     $('.suggested-search span').first().addClass('active');
    // } else if(suggestedSearchValLength == 0 && e.keyCode == 38){
    //     if($('.suggested-search span').last().hasClass('active')){
    //         $('.suggested-search span').first().addClass('active');
    //     } else {
    //         $('.suggested-search span').removeClass('active');
    //         $('.suggested-search span').last().addClass('active');
    //     }

});

$(".choosen-flats-div").delegate(".clickHandler", "click", function(event){
    let single_house = new singleHouse();
    const id = $(event.target).attr('data-single_target_id');
    single_house.getData(id, true);
    document.querySelector('#see_single_house').addEventListener('click', (e) => {
        window.location.href = "house.html?house=" + id;
    });
});


function StirngConvertToBoolean(string){
    return string == 'true' ? true: false;
}

function loadOwl(){
   // debugger;
    $('.owl-carousel').each(function() {
        let Items = (($(this).attr('dataItems')) ? parseInt($(this).attr('dataItems')) : 3);
        let Margin = (($(this).attr('dataMargin')) ? parseInt($(this).attr('dataMargin')) : 10);
        let AutoHeight = (($(this).attr('dataAutoHeight')) ? StirngConvertToBoolean($(this).attr('dataAutoHeight')) : false);
        let Nav = (($(this).attr('dataNav')) ? StirngConvertToBoolean($(this).attr('dataNav')) : false);
        let Dots = (($(this).attr('dataDots')) ? StirngConvertToBoolean($(this).attr('dataDots')) : false);
        let Autoplay = (($(this).attr('dataAutoplay')) ? StirngConvertToBoolean($(this).attr('dataAutoplay')) : false);
        let AutoPlaySpeed = (($(this).attr('dataAutoPlaySpeed')) ? parseInt($(this).attr('dataAutoPlaySpeed')) : 3000);
        let AutoPlayTimeout = (($(this).attr('dataAutoPlayTimeout')) ? parseInt($(this).attr('dataAutoPlayTimeout')) : 3000);
        let AutoplayHoverPause = (($(this).attr('dataAutoplayHoverPause')) ? StirngConvertToBoolean($(this).attr('dataAutoplayHoverPause')) : false);
        let Loop = (($(this).attr('dataLoop')) ? StirngConvertToBoolean($(this).attr('dataLoop')) : false);
        let MouseDrag = (($(this).attr('dataMouseDrag')) ? StirngConvertToBoolean($(this).attr('dataMouseDrag')) : false);
        let TouchDrag = (($(this).attr('dataTouchDrag')) ? StirngConvertToBoolean($(this).attr('dataTouchDrag')) : false);
        let PullDrag = (($(this).attr('dataPullDrag')) ? StirngConvertToBoolean($(this).attr('dataPullDrag')) : false);
        let ResponsiveItemSmall = (($(this).attr('dataResponsiveItemSmall')) ? parseInt($(this).attr('dataResponsiveItemSmall')) : 3);
        let ResponsiveItemMedium = (($(this).attr('dataResponsiveItemMedium')) ? parseInt($(this).attr('dataResponsiveItemMedium')) : 3);
        let ResponsiveItemBig = (($(this).attr('dataResponsiveItemBig')) ? parseInt($(this).attr('dataResponsiveItemBig')) : 3);
        let ResponsiveSmallNav = (($(this).attr('dataResponsiveSmallNav')) ? StirngConvertToBoolean($(this).attr('dataResponsiveSmallNav')) : false);
        let ResponsiveMediumNav = (($(this).attr('dataResponsiveMediumNav')) ? StirngConvertToBoolean($(this).attr('dataResponsiveMediumNav')) : false);
        let ResponsiveBigNav = (($(this).attr('dataResponsiveBigNav')) ? StirngConvertToBoolean($(this).attr('dataResponsiveBigNav')) : false);

        $( this ).owlCarousel({
            items: Items,
            margin: Margin,
            autoHeight: AutoHeight,
            nav: Nav,
            dots: Dots,
            autoplay: Autoplay,
            autoPlaySpeed: AutoPlaySpeed,
            autoPlayTimeout: AutoPlayTimeout,
            autoplayHoverPause: AutoplayHoverPause,
            loop: Loop,
            mouseDrag: MouseDrag,
            touchDrag: TouchDrag,
            pullDrag: PullDrag,
            navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            responsive:{
                0:{
                    items: 1,
                    nav: ResponsiveSmallNav
                },
                600:{
                    items: ResponsiveItemSmall,
                    nav: ResponsiveMediumNav
                },
                779:{
                    items: ResponsiveItemMedium,
                    nav: ResponsiveMediumNav
                },
                1000:{
                    items: ResponsiveItemMedium,
                    nav: ResponsiveMediumNav,
                },
                1200:{
                    items: ResponsiveItemMedium,
                    nav: ResponsiveMediumNav,
                },
                1250:{
                    items: ResponsiveItemBig,
                    nav: ResponsiveMediumNav,
                }
            }
        });
    });
}
var owlSlider = $(".owl-carousel").length;

$(window).on('load', function(){
    console.log('bhbhhbhbhbhb');
    console.log(BgsliderImages);
    console.log($(".owl-carousel").length);


    // $(document).ajaxStop(function () {
    //     console.log('aaaaaa');
        if ( owlSlider && BgsliderImages != '' && bestFlatsSlider != '') {
            loadOwl();
            console.log('load owl')
        }
    // });
});