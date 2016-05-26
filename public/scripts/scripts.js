$(document).ready(function() {

  const icons = {
    'clear-day': 'B',
    'clear-night': 'C',
    'rain': 'R',
    'snow': 'W',
    'sleet': 'X',
    'wind': 'S',
    'fog': 'M',
    'cloudy': 'Y',
    'partly-cloudy-day': 'H',
    'partly-cloudy-night': 'I'
  };

  // using the HTML5 geolocation API, which means that, for the current location, will use the browser's ability to provide the latitude and longitude of the user's current location.

  const cities = {
    'Anaheim'           : {coords:  {latitude: 33.8352778, longitude: -117.9136111} },
    'Anchorage'         : {coords:  {latitude: 61.2180556, longitude: -149.9002778} },
    'Bahamas'           : {coords:  {latitude: 25.025885,  longitude: -78.035889 } },
    'Brentwood'         : {coords:  {latitude: 36.0330556, longitude: -86.7827778 } },
    'Chapel Hill'       : {coords:  {latitude: 35.6264581, longitude: -86.6933305} },
    'Franklin'          : {coords:  {latitude: 35.9250637, longitude: -86.86889} },
    'Hermitage'         : {coords:  {latitude: 36.1961664, longitude: -86.6224959} },
    'Murfreesboro'      : {coords:  {latitude: 35.8456213, longitude: -86.39027} },
    'Nashville'         : {coords:  {latitude: 36.1658899, longitude: -86.7844432} },
    'New Johnsonville'  : {coords:  {latitude: 36.0211715, longitude: -87.9669765} },
    'Pottsville'        : {coords:  {latitude: 35.6378474, longitude: -86.825278} },
    'Seattle'           : {coords:  {latitude: 47.6062095, longitude: -122.3320708 } }
    // 'current location': {coords : {lat, lng:} }
  };

  function loadWeather(cityCoords) {
    console.log(cityCoords);
    let latlng = cityCoords.coords.latitude + ',' + cityCoords.coords.longitude;  // create string as API URL requires (https://api.forecast.io/forecast/a52853f6b4cb5a11f44d22cb01949a6d/37.8267,-122.423)

    const forecastURL = "https://api.forecast.io/forecast/a52853f6b4cb5a11f44d22cb01949a6d/" + latlng;  // API URL

    $.ajax({  // uses jsonp to get around
      url: forecastURL,
      jsonCallback: 'jsonCallback', // what kind of request this is - jQuery provides the ability to make jsonp calls; this is the jsonp callback function
      contentType: 'application/json',
      dataType: 'jsonp',
      success: function(json) {
        console.log(json);
        $('#current_temp').html(Math.round(json.currently.temperature) + '&#176;F');  // display current temp from json data
        $('#current_summary').html(json.currently.summary);  // display current summary from json data
        $('#current_temp').attr('data-icon', icons[json.currently.icon]);  // get icon data from json data, pass to 'icons' array for Meteocons icon-letter match
      },
      error: function(e) {
        console.log(e.message);
      }
    });
  }

  loadCity('Chapel Hill');

  function loadCity(city) {  // receives value of city clicked on
    // console.log(city);
    $('#location').html(city);  // update location in DOM
    loadWeather(cities[city]);
  }

  $('a.city').bind('click', function() {  // when a city is clicked, bind the click functionality
    loadCity($(this).html());  // pass value of city clicked on to loadCity()
  });

});
