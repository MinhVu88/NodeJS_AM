const getLocation = require('./location_1'),
      getForecast = require('./forecast_1'),
      place = process.argv[2];

if (!place) {
    console.log('Plz provide a location');
} else {
    getLocation(place, 1, (error, {location, longitude, latitude} = {}) => {
        if(error) return console.log('Error:',error);
    
        getForecast(longitude, latitude, 'f', (error, {weather, temperature_fahrenheit, feels_like}) => {
            if(error) return console.log('Error:',error);
    
            console.log(`Location: ${location} | Weather: ${weather} - Temperature (in fahrenheit): ${temperature_fahrenheit} - Feels like: ${feels_like}`);
        });
    });
}