const http = require('http'),
      api_key = 'd3804caa44e6d229ab5a4feabf15beef',
      temperature_type = 'f',
      longitude = -122.4233,
      latitude = 37.8267, 
      url = `http://api.weatherstack.co/current?access_key=${api_key}&query=${latitude},${longitude}&units=${temperature_type}`; // .com

const request = http.request(url, response => {
    let data = '';

    response.on('data', chunk => data = data.concat(chunk.toString()));

    response.on('end', () => console.log(JSON.parse(data)));
});

request.on('error', error => console.log(error));

request.end();