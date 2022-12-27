const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const weatherurl = `http://api.weatherstack.com/current?access_key=7b5a798947fded508a6843f29f04d444&query=${latitude},${longitude}`;

  request({ url: weatherurl, json: true }, (err, response) => {
    if (err) {
      //when you don't have a network connection
      callback("Unable to connect to the weather service!");
    } else if (response.body.error) {
      //when the url is incorrect
      callback(
        "Unable to find the location. Please check your URL and try again."
      );
    } else {
      // console.log(response.statusCode);

      // const data = JSON.parse(response.body);
      const data = response.body.current;
      callback(
        undefined,
        data.weather_descriptions[0] +
          ". It is currently " +
          data.temperature +
          " degrees out. It feels like " +
          data.feelslike +
          " degrees out in "
      );
    }
  });
};

module.exports = forecast;
