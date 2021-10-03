const request_0 = require('postman-request'),
      request_1 = require('postman-request');

const api_key_0 = 'd3804caa44e6d229ab5a4feabf15beef',
      temperature_type = 'f',
      longitude = -122.4233,
      latitude = 37.8267,
      url_0 = `http://api.weatherstack.com/current?access_key=${api_key_0}&query=${latitude},${longitude}&units=${temperature_type}`;
      
request_0({url: url_0, json: true}, (error, response) => {
    if (error) {
        console.log('Error: Unable to connect to weatherstack api services | statusCode:', response && response.statusCode);
    } else if(response.body.error) {
        console.log('Unable to find the location');
    } else {
        console.log(`Weather: ${response.body.current.weather_descriptions[0]}. 
                 It's currently ${response.body.current.temperature} degrees but feels like ${response.body.current.feelslike} degrees`);    
    }    
});

const api_key_1 = 'pk.eyJ1IjoiaGFucy1yaXR0ZXIiLCJhIjoiY2thaHduaTVhMDY5NzJ6bnVodzhicDliZCJ9.LyrzN5YFU4oXvPGhyrq_Og',
      result_limit = 1,
      location = '....',
      url_1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${api_key_1}&limit=${result_limit}`;

request_1({url: url_1, json: true}, (error, response) => {
    if (error) {
        console.log('Error: Unable to connect to mapbox api services | statusCode:', response && response.statusCode);
    } else if(response.body.features.length === 0) {
        console.log('Unable to find the location');
    } else {
        console.log('Longitude:',response.body.features[0].center[0],'| Latitude:',response.body.features[0].center[1]);    
    }
});