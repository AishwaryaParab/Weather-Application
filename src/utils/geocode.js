const request = require('postman-request');

const geocode = (address, callback) => {
  const geourl = `http://api.positionstack.com/v1/forward?access_key=9368fbac112c4a1c09d264a17fe79522&query=${address}`;

  request({ url: geourl, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to the positionstack service!", undefined);
    } else if (response.body.error) {
      //when the URL is incorrect
      callback(
        "Unable to find the location. Please check your URL and try again.",
        undefined
      );
    } else if (response.body.data.length === 0) {
      //when the location is incorrect
      callback(
        "Unable to find the location. Please try again with another location."
      );
    } else {
      const data = response.body.data;
      const place = data[0];

      callback(undefined, {
        latitude: place.latitude,
        longitude: place.longitude,
        name: place.name,
      });
    }
  });
};

module.exports = geocode;
