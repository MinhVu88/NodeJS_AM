const request = require('postman-request'),
      api_key = 'd3804caa44e6d229ab5a4feabf15beef';

const getForecast = (longitude, latitude, temperature_type, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${latitude},${longitude}&units=${temperature_type}`;

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weatherstack api services', undefined);
        } else if(response.body.error) {
            callback('Unable to find the location', undefined);
        } else {
            callback(undefined, {
                weather: response.body.current.weather_descriptions[0], 
                temperature_fahrenheit: response.body.current.temperature, 
                feels_like: response.body.current.feelslike
            });    
        }    
    })
};

module.exports = getForecast;