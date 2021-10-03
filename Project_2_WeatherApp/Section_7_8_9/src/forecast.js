if (process.env.NODE_ENV !== "production") require("dotenv").config();

const request = require("postman-request"),
  api_key = process.env.WEATHERSTACK_API_KEY;

const getForecast = (longitude, latitude, temperature_type, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${latitude},${longitude}&units=${temperature_type}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weatherstack api services", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        weather: body.current.weather_descriptions[0],
        temperature_fahrenheit: body.current.temperature,
        feels_like: body.current.feelslike,
        humidity: body.current.humidity
      });
    }
  });
};

module.exports = getForecast;
