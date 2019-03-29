/*let priceStart=0;
let priceEnd=document.querySelector('#rg4').getAttribute("max");
let spaceStart=0;
let spaceEnd=document.querySelector('#rg2').getAttribute("max");*/
let imgs = [];
let checker = true;

let maxPrice = 0;
let minPrice = 0;
let maxSpace = 0;
let minSpace = 0;

$(document).ready(() => {
    loadMinMaxVals();
    sendRequest();
    getDynamicOptions();
});
let test=document.querySelectorAll('.space_range')

$('.space_range_container').on('change', '.space_range', (e) => {
    let newinput=$('#spaceRange')[0].value.split(',');
    $('#spaceRangeValue').html(newinput[0]);
    $('#rg1_val1').html(newinput[1]);
})
$('.price_range_container').on('change', '.price_range', (e) => {
    let newinput=$('#priceRange')[0].value.split(',');
    $('#rg2_val').html(newinput[0]);
    $('#rg3_val').html(newinput[1]);
})
$('.expanded_space_range_container').on('change', '.expanded_space_range', (e) => {
    let newinput=$('#expanded_spaceRange')[0].value.split(',');
    $('#expanded_spaceRangeValue').html(newinput[0]);
    $('#expanded_rg1_val1').html(newinput[1]);
})
$('.expanded_price_range_container').on('change', '.expanded_price_range', (e) => {
    let newinput=$('#expanded_priceRange')[0].value.split(',');
    $('#expanded_rg2_val').html(newinput[0]);
    $('#expanded_rg3_val').html(newinput[1]);
})


// document.querySelector('.').addEventListener('change',(e)=>{
//
// });
/*
document.querySelector('#ranges_3').addEventListener('change',(e)=>{
    switch(e.target.id){
        case 'rg3':
            document.querySelector('#rg2_val').innerHTML=e.target.value+'GEL';
            priceStart=e.target.value;
            break;
        case 'rg4':
            document.querySelector('#rg3_val').innerHTML=' - '+e.target.value+'GEL';
            priceEnd=e.target.value;
            break;
    }
});
document.querySelector('#ranges_1').addEventListener('change',(e)=>{
    switch(e.target.id){
        case 'rg5':
            document.querySelector('#rg4_val').innerHTML=e.target.value+'მ2';
            spaceStart=e.target.value;
            break;
        case 'rg6':
            spaceEnd=e.target.value;
            document.querySelector('#rg5_val').innerHTML=' - '+e.target.value+'მ2';
            break;
    }
});
document.querySelector('#ranges_2').addEventListener('change',(e)=>{
    switch(e.target.id){
        case 'rg7':
            document.querySelector('#rg6_val').innerHTML=e.target.value+'GEL';
            priceStart=e.target.value;
            break;
        case 'rg8':
            document.querySelector('#rg7_val').innerHTML=' - '+e.target.value+'GEL';
            priceEnd=e.target.value;
            break;
    }
});*/
let btn = document.querySelector('#showHousesFilters');
btn.addEventListener('click', (e) => {
    let smallHouses = document.querySelector('#small_houses');
    let largeHouses = document.querySelector('#large_houses');
    let main = document.querySelector('#houses_col');
    let map = document.querySelector('#map_col');
    let divPos = document.querySelector('.gm_houses_div');
    if (largeHouses.style.display == 'none') {
        divPos.style.position = 'absolute';
        divPos.style.zIndex = 99;
        map.className = 'col-lg-12';
        main.className = 'col-lg-12';
        main.style.height = "500px";
        smallHouses.style.display = 'none';
        largeHouses.style.display = '';
        btn.className = 'fa fa-angle-left'
        map.style.position = 'absolute';
        document.querySelector('.gm_houses_div').style.width = '92%';
        let city = document.querySelector('#cities');
        let district = document.querySelector('#districts');
        let type = document.querySelector('#house_type');
        document.querySelector('#expanded_cities').value = city.value;
        district.value = city.childNodes[1].value;
        type.value = type.childNodes[1].value;
        checker = false;
    } else {
        map.style.position = 'relative';
        divPos.style.position = 'relative';
        divPos.style.zIndex = 0;
        map.className = 'col-lg-8';
        main.className = 'col-lg-4 text-left';
        main.style.height = '';
        smallHouses.style.display = '';
        largeHouses.style.display = 'none';
        btn.className = 'fa fa-angle-right'
        document.querySelector('.gm_houses_div').style.width = '100%';
        let cities = document.querySelector('#expanded_cities');
        document.querySelector('#cities').value = cities.value ;
        let types = document.querySelector('#expanded_types');
        types.value = types.childNodes[1].value;
        let districts = document.querySelector('#expanded_districts');
        districts.value = cities.childNodes[1].value;
        let condition = document.querySelector('#expanded_condition');
        condition.value = condition.childNodes[1].value;
        checker = true;
    }
});
checkChildren = () => {
    let mainRow = document.querySelector('#houses_row');
    let smallMainRow = document.querySelector('#houses_row_small');
    if (smallMainRow.childNodes.length >= 1) {
        smallMainRow.innerHTML = '';
    }
    if (mainRow.childNodes.length >= 1) {
        mainRow.innerHTML = '';
    }
    return;
}

parseSortingData=()=>{
    let cityVal;
    let districtVal;
    let typeVal;
    let cities=document.querySelector('#cities');
    let districts=document.querySelector('#districts');
    let type=document.querySelector('#house_type');
    let expanded_cities=document.querySelector('#expanded_cities');
    let expanded_districts=document.querySelector('#expanded_districts');
    let expanded_types=document.querySelector('#expanded_types');
    let expanded_condition=document.querySelector('#expanded_condition');
    let expanded_rooms=document.querySelector('#expanded_rooms');
    let expanded_sorting=document.querySelector('#expanded_sorting');
    let sortedData;
    if(!checker){
        typeVal=type.value;
        cityVal=cities.value;
        districtVal=districts.value;
        sortedData = {
            city: cityVal,
            region: districtVal,
            type: typeVal,
            condition: expanded_condition.value,
            rooms: expanded_rooms.value,
            sort: expanded_sorting.value,
        };
    }else{
        typeVal=expanded_types.value;
        cityVal=expanded_cities.value;
        districtVal=expanded_districts.value;
        sortedData = {
            city: cityVal,
            region: districtVal,
            type: typeVal,
            condition: expanded_condition.value,
            rooms: expanded_rooms.value,
            sort: expanded_sorting.value
        };
    }
        // sortedData = '?city=' + cityVal + '&&region=' + districtVal + '&&type='
        //     + typeVal + '&&condition=' + expanded_condition.value + '&&rooms=' + expanded_rooms.value+
        //     '&&spaceStart='+spaceStart+'&&spaceEnd='+spaceEnd+'&&priceStart='+priceStart+'&&priceEnd='+priceEnd;
    // }else{
    //     sortedData='';
    // }

    console.log(sortedData);
    return sortedData;
}
getBoundedLocations = (lat, lng) => {
    $.ajax({
        type: "GET",
        url: '/property/closest?lat=' + lat + '&lng=' + lng + '',
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            let locations = [];
            while (document.querySelector('#houses_row').firstChild) {
                document.querySelector('#houses_row').removeChild(document.querySelector('#houses_row').firstChild);
            }
            while (document.querySelector('#houses_row_small').firstChild) {
                document.querySelector('#houses_row_small').removeChild(document.querySelector('#houses_row_small').firstChild);
            }
            for (let i = 0; i < data.length; i++) {
                let singleLoc = [];
                singleLoc.push(data[i].price, data[i].latitude, data[i].longitude);
                locations.push(singleLoc);
                create(data, i);

            }
            slideListeners(firstDiv());
            createPopupData(locations);
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
sendRequest = () => {
    let filters=parseSortingData();
    $.ajax({
        type: "GET",
        url: '/property/search',
        data: {
            ...filters,
            priceStart: '',
            priceEnd: '',
            spaceStart: '',
            spaceEnd: '',
        },
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            console.log(data)
            let mainRow = document.querySelector('#houses_row');
            mainRow.innerHTML = "";
            let mainRowS = document.querySelector('#houses_row_small');
            mainRowS.innerHTML = "";
            let locations = [];

            for (let i = 0; i < data.length; i++) {
                locations.push([data[i].price, data[i].latitude, data[i].longitude, 15]);
                create(data,i);
            }
            housesMap(locations, data);
            slideListeners(firstDiv());
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
create = (data, i) => {
    let mainRow = document.querySelector('#houses_row');
    let smallMainRow = document.querySelector('#houses_row_small');
    mainRow.appendChild(createHouses(data, i)[0]);
    smallMainRow.appendChild(createHouses(data, i)[1]);
}
let map, popup, Popup;
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
function housesMap(locations, data) {
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
    let myOptions = {
        zoom: 15,
        center: {lat: locations[0][1], lng: locations[0][2]},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: stylers
    };
    map = new google.maps.Map(document.querySelector('#gm_google_map'),
        myOptions
    );
    createPopupData(locations);
    // google.maps.event.addListenerOnce(map, 'idle', () => {
    //
    //     // if zoom changed
    //     google.maps.event.addListener(map, 'zoom_changed', () => {
    //         getBoundedLocations(map.getCenter().lat(), map.getCenter().lng());
    //
    //     });
    //     // if map dragend
    //     google.maps.event.addListener(map, 'dragend', () => {
    //         getBoundedLocations(map.getCenter().lat(), map.getCenter().lng());
    //
    //     });
    //     // map resize
    //     google.maps.event.addListener(map, 'resize ', () => {
    //         getBoundedLocations(map.getCenter().lat(), map.getCenter().lng());
    //
    //     });
    // });
}
createPopupData = (locations) => {
    while (document.querySelector('.popup-tip-anchor')) {
        document.querySelector('.popup-tip-anchor').remove();
    }
    for (let i = 0; i < locations.length; i++) {
        let content = document.createElement('div');
        let lttd = document.createElement('span');
        lttd.style.display = 'none';
        lttd.innerHTML = locations[i][1];
        content.id = 'gm_content';
        content.setAttribute('data-toggle', 'modal');
        content.setAttribute('data-target', '#houseModal');
        content.innerHTML = locations[i][0] + ' GEL';
        content.appendChild(lttd);
        definePopupClass();
        popup = new Popup(
            new google.maps.LatLng(locations[i][1], locations[i][2]),
            content);
        popup.setMap(map);
        let dt = document.querySelectorAll('.lttd');
        content.parentNode.parentNode.addEventListener('mouseover', (e) => {
            let divLttd;
            for (let z = 0; z < dt.length; z++) {
                divLttd = dt[z];
                if (content.childNodes[1].innerHTML === divLttd.innerHTML) {
                    shakeElement(divLttd.parentNode);
                }
            }
        });
        content.parentNode.parentNode.addEventListener('click', (e) => {
            if (iterateHouses(e.target.childNodes[1]) !== false) {
                let single_house = new singleHouse();
                let divLttd = iterateHouses(e.target.childNodes[1]);
                single_house.getData(divLttd.getAttribute('name'), true);
                document.querySelector('#see_single_house').addEventListener('click', (e) => {
                    window.location.href = "house.html?house=" + divLttd.getAttribute('name');
                });
            }
        });
    }
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
getDynamicOptions = () => {
    let expanded_cities = document.querySelector('#expanded_cities');
    let expanded_districts = document.querySelector('#expanded_districts');
    let expanded_types = document.querySelector('#expanded_types');
    let expanded_condition = document.querySelector('#expanded_condition');
    let expanded_rooms = document.querySelector('#expanded_rooms');
    let expanded_sorting = document.querySelector('#expanded_sorting');
    let districts = document.querySelector('#districts');
    let types = document.querySelector('#house_type');
    let cities = document.querySelector('#cities');
    let myData;
    $.ajax({
        type: "GET",
        url: '/property/allElements',
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            myData = data;
            for (let i = 0; i < data.cities.length; i++) {
                let option = document.createElement('OPTION');
                option.value = data.cities[i].id;
                option.innerHTML = data.cities[i].name;
                expanded_cities.appendChild(option);
            }
            for (let i = 0; i < data.cities.length; i++) {
                let option = document.createElement('OPTION');
                option.value = data.cities[i].id;
                option.innerHTML = data.cities[i].name;
                cities.appendChild(option);
            }
            for (let i = 0; i < data.regions.length; i++) {
                let option = document.createElement('OPTION');
                let region;
                if (data.regions[i].cityId !== null) {
                    region = data.regions[i].cityId.toString();
                }
                if (expanded_cities.childNodes[1].value === region) {
                    option.value = data.regions[i].id;
                    option.innerHTML = data.regions[i].name;
                    expanded_districts.appendChild(option);
                }
            }
            for (let i = 0; i < data.regions.length; i++) {
                let option = document.createElement('OPTION');
                let region;
                if (data.regions[i].cityId !== null) {
                    region = data.regions[i].cityId.toString();
                }
                if (cities.childNodes[1].value === region) {
                    option.value = data.regions[i].id;
                    option.innerHTML = data.regions[i].name;
                    districts.appendChild(option);
                }
            }
            for (let i = 0; i < data.types.length; i++) {
                let option = document.createElement('OPTION');
                option.value = data.types[i].id;
                option.innerHTML = data.types[i].name;
                expanded_types.appendChild(option);
            }
            for (let i = 0; i < data.types.length; i++) {
                let option = document.createElement('OPTION');
                option.value = data.types[i].id;
                option.innerHTML = data.types[i].name;
                types.appendChild(option);
            }
            for (let i = 0; i < data.conditions.length; i++) {
                let option = document.createElement('OPTION');
                option.value = data.conditions[i].id;
                option.innerHTML = data.conditions[i].name;
                expanded_condition.appendChild(option);
            }
            // for (let i = 0; i < data.sort.length; i++) {
            //     let option = document.createElement('OPTION');
            //     option.value = data.sort[i].id;
            //     option.innerHTML = data.sort[i].name;
            //     expanded_sorting.appendChild(option);
            // }
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
    document.querySelector('#expanded_cities').addEventListener('change', (e) => {
        expanded_districts.innerHTML = '<option value="0">აირჩიეთ უბანი</option>';

        for (let i = 0; i < myData.regions.length; i++) {
            let region;
            if (myData.regions[i].cityId !== null) {
                region = myData.regions[i].cityId.toString();
            }
            if (e.target.value === region) {
                let option = document.createElement('OPTION');
                option.value = myData.regions[i].id;
                option.innerHTML = myData.regions[i].name;
                expanded_districts.appendChild(option);
            }
        }
        checkChildren();
        sendRequest();
    });

    document.querySelector('#cities').addEventListener('change', (e) => {
        districts.innerHTML = '<option value="0">აირჩიეთ უბანი</option>';
        for (let i = 0; i < myData.regions.length; i++) {
            let region;
            if (myData.regions[i].cityId !== null) {
                region = myData.regions[i].cityId.toString();
            }
            if (e.target.value === region) {
                let option = document.createElement('OPTION');
                option.value = myData.regions[i].id;
                option.innerHTML = myData.regions[i].name;
                districts.appendChild(option);
            }
        }
        checkChildren();
        sendRequest();
    });
    districts.addEventListener('change', (e) => {
        checkChildren()
        sendRequest();
    });
    types.addEventListener('change', (e) => {
        checkChildren();
        sendRequest();
    });
    expanded_types.addEventListener('change', (e) => {
        checkChildren();
        sendRequest();
    });
    expanded_condition.addEventListener('change', (e) => {
        checkChildren();
        sendRequest();
    });
    expanded_districts.addEventListener('change', (e) => {
        checkChildren();
        sendRequest();
    });
    expanded_sorting.addEventListener('change', (e) => {
        // checkChildren();
        sendRequest();
    });
    expanded_rooms.addEventListener('change', (e) => {
        // checkChildren();
        sendRequest();
    });
}
/** Defines the Popup class. */
shakeElement = (element) => {
    element.classList.add('shakeDiv');
    setTimeout(() => {
        element.classList.remove('shakeDiv');
    }, 500);
}
createHouses = (data, i) => {
    let dv = document.createElement('div');
    dv.className = 'col-md-4';
    let lttd = document.createElement('div');
    lttd.style.display = 'none';
    lttd.innerHTML = data[i].latitude;
    lttd.className = 'lttd';
    lttd.setAttribute('name', data[i].id);
    let dvInner = document.createElement('div');
    let hr = document.createElement('HR');
    hr.id = 'col_hr';
    dvInner.className = 'transition row houses_row_left';
    let innerCol = document.createElement('div');
    innerCol.className = 'col-lg-6 px-0';
    let innerCol2 = document.createElement('div');
    innerCol2.className = 'col-lg-6';
    let houses_img_wrapper = document.createElement('div');
    houses_img_wrapper.className = 'houses_img_wrapper';
    let houses_img_text = document.createElement('div');
    houses_img_text.className = 'houses_img_text';
    let span1 = document.createElement('SPAN');
    span1.className = 'transition fa fa-angle-left float-left';
    span1.id = 'slide-left';
    let span2 = document.createElement('SPAN');
    span2.className = 'transition fa fa-angle-right float-right';
    span2.id = 'slide-right';
    let h2 = document.createElement('h2');
    h2.innerHTML = data[i].name;
    let small = document.createElement('small');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p1.innerHTML = data[i].space + '<span id="supersquare" class="rangesquare">2</span>'
    small.innerHTML = data[i].propertyRegion.name;
    p2.innerHTML = data[i].price + ' GEL';
    let span1Wrapper = document.createElement('div');
    span1Wrapper.className = 'span1Wrapper';
    span1Wrapper.appendChild(span1);
    let span2Wrapper = document.createElement('div');
    span2Wrapper.className = 'span2Wrapper';
    span2Wrapper.appendChild(span2);
    houses_img_text.appendChild(span1Wrapper);
    houses_img_text.appendChild(span2Wrapper);
    houses_img_wrapper.appendChild(houses_img_text);
    innerCol.appendChild(houses_img_wrapper);
    let imgContainer = document.createElement('div');
    imgContainer.className = 'imgContainer';
    if (data[i].propertyImages.length <= 0) {
        let img = document.createElement('img');
        img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png');
        img.className = 'housesSlide';
        imgContainer.appendChild(img);
    }
    for (let z = 0; z < data[i].propertyImages.length; z++) {
        let img = document.createElement('img');
        img.setAttribute('src', IMAGEURL + data[i].propertyImages[z].file);
        if (data[i].propertyImages[z].file === null) {

        }
        img.className = 'housesSlide';
        imgContainer.appendChild(img);
    }
    innerCol.appendChild(imgContainer);
    innerCol2.appendChild(h2);
    innerCol2.appendChild(small);
    innerCol2.appendChild(p1);
    innerCol2.appendChild(p2);
    dvInner.appendChild(innerCol);
    dvInner.appendChild(innerCol2);
    dvInner.appendChild(hr);
    dvInner.appendChild(lttd);
    dv.appendChild(dvInner);
    return [dv, dvInner];
};
let plusDivs = (n, e, slideIndex) => {
    let a;
    if (e.target.parentNode.parentNode.parentNode.className === 'col-lg-6 px-0') {
        a = e.target.parentNode.parentNode.parentNode;
    } else if (e.target.parentNode.parentNode.parentNode.parentNode.className === 'col-lg-6 px-0') {
        a = e.target.parentNode.parentNode.parentNode.parentNode;
    }
    let element = a.childNodes[1].childNodes;
    for (let i = 0; i < slideIndex.length; i++) {
        if (slideIndex[i].element === element) {
            checkDivs(e, slideIndex[i].slideIndex += n, slideIndex);
        }
    }
}
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
}
let getDivs = () => {
    let arr = [];
    let x = document.querySelectorAll('.imgContainer');
    for (let i = 0; i < x.length; i++) {
        arr.push(x[i].childNodes);
    }
    return arr;
}
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
}
let checkDivs = (e, n, mainElement) => {
    let a;
    if (e != null) {
        if (e.target.parentNode.parentNode.parentNode.className === 'col-lg-6 px-0') {
            a = e.target.parentNode.parentNode.parentNode;
        } else if (e.target.parentNode.parentNode.parentNode.parentNode.className === 'col-lg-6 px-0') {
            a = e.target.parentNode.parentNode.parentNode.parentNode;
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
}
let loadMinMaxVals = () => {
    $.ajax({
        type: "GET",
        url: '/property/minmax',
        data: {
            "city":$((checker?"#expanded_cities":"#cities")).val()
        },
        async:false,
        enctype: 'multipart/form-data',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (data) => {
            console.log(data);
            maxPrice = data.maxPrice;
            minPrice = data.minPrice;
            maxSpace = data.maxSpace;
            minSpace = data.minSpace;
            $('#spaceRange')[0].valueLow=data.minPrice;
            $('#spaceRange')[0].valueHigh=data.maxPrice;
            console.log($('#spaceRange')[0].valueHigh);
            $('.space_range').forEach((el) => {
                el.val(`${minSpace},${maxSpace}`);
            })
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
loadMinMaxVals();