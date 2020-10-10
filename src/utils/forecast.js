const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=7f281f3eaacc6e8156d089c44b7d7481&query=${latitude},${longitude}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!');
		} else if (body.error) {
			callback('Unable to find location');
		} else {
			const data = body.current;
			callback(undefined, {
				weather: data.weather_descriptions[0],
				temperature: data.temperature,
				feelslike: data.feelslike
			});
		}
	});
};

module.exports = forecast;
