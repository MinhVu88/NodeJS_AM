const getLocation = require('./location_0'),
      getForecast = require('./forecast_0');

getLocation('Munich', 1, (error, response) => console.log('Error:',error,'| Response ->',response));

getForecast(-75.7088, 44.1545, 'f', (error, response) => console.log('Error:',error,'| Response ->',response));