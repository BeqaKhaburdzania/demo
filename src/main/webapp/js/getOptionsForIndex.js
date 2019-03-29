$(() => {
  $.ajax({
    type: "GET",
    url: '/property/allElements',
    enctype: 'multipart/form-data',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (data) => {
      const cities = $('#cities');
      const house_types = $('#house_types');

      data.cities.forEach((city) => {
        cities.append(`<option value="${city.id}">${city.name}</option>`)
      });
      data.types.forEach((type) => {
        house_types.append(`<option value="${type.id}">${type.name}</option>`)
      });

    }
  });
  $('#cities').on('change', (event) => {
    const element = event.target;
    const cityId = element.value;
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
  });
  $('#gm_top_search_btn').on('click', (event) => {
    event.preventDefault();
     const city=$('#index_search_input').val();
     let spaceStart = $('.space_range_container').attr('spaceStart');
     let spaceEnd= $('.space_range_container').attr('spaceEnd');
     let priceStart= $('.price_range_container').attr('priceStart');
     let priceEnd= $('.price_range_container').attr('priceEnd');
     if(spaceStart == undefined){
         spaceStart = '';
     }
     if(spaceEnd == undefined){
          spaceEnd = '';
     }
      if(priceStart == undefined){
          priceStart = '';
      }
      if(priceEnd == undefined){
          priceEnd = '';
      }
    // const city = $('#cities').val();
    // const district = $('#districts').val();
    // const type = $('#house_types').val();
    window.location.href = `houses.html?string=`+city+`&spaceStart=`+spaceStart+`&spaceEnd=`+spaceEnd+`&priceStart=`+priceStart+'&priceEnd='+priceEnd;
  });
});
