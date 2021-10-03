if (process.env.NODE_ENV !== "production") require("dotenv").config();

const request = require("postman-request"),
  api_key = process.env.MAPBOX_API_KEY;

const getLocation = (location, result_limit, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${api_key}&limit=${result_limit}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to mapbox api services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1]
      });
    }
  });
};

module.exports = getLocation;
