const getLocation = require('./location_0'),
      getForecast = require('./forecast_0');

getLocation('Boston', 1, (error, location_data) => {
    if(error) return console.log('Error:',error);

    getForecast(location_data.longitude, location_data.latitude, 'f', (error, weather_data) => {
        if(error) return console.log('Error:',error);

        console.log(`Location: ${location_data.location} | 
                     Weather: ${weather_data.weather}, 
                     temperature (in fahrenheit): ${weather_data.temperature_fahrenheit}, 
                     feels like: ${weather_data.feels_like}`);
    });
});