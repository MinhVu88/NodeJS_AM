const request = require('postman-request'),
      api_key = 'pk.eyJ1IjoiaGFucy1yaXR0ZXIiLCJhIjoiY2thaHduaTVhMDY5NzJ6bnVodzhicDliZCJ9.LyrzN5YFU4oXvPGhyrq_Og';

const getLocation = (location, result_limit, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${api_key}&limit=${result_limit}`;

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to mapbox api services', undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find the location', undefined);
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]
            });    
        }
    });
};

module.exports = getLocation;