const fetch = require('node-fetch');
const config = require('./weather-api-config.json');

function weatherController(Weather){
	function post(req, res) {
		const weather = new Weather(req.body);
		async function postEntry(){
			let status;
			const weatherApiResponse =  await fetch(`${config.weatherURL}?q=${weather.location}&appid=${config.appID}`)
				.then((res) => { 
					status = res.status; 
					return res.json(); 
				});

			if (status == 404) { 
				console.log('Error : there was an isssue with weather API, validate \'location\' parameter value or API is not working');
				res.status(400); //if 404 then fetched request is bad which mean status 400
				return res.send('Error : there was an isssue with weather API, validate \'location\' parameter value or API is not working');
			}
			else{
				console.log('record was added');
				console.log(status);
				weather.weather.shortDescription=weatherApiResponse.weather[0].description;
				weather.weather.temperature = weatherApiResponse.main.temp;
				weather.weather.humidity = weatherApiResponse.main.humidity;
				weather.weather.pressure = weatherApiResponse.main.pressure;
				weather.weather.visibility = weatherApiResponse.visibility;
				weather.weather.windDeg = weatherApiResponse.wind.speed;
				weather.weather.windSpeed =weatherApiResponse.wind.deg;
				weather.weather.clouds =weatherApiResponse.clouds.all;
				weather.weather.matchedLocatioName =weatherApiResponse.name;     
			}
			console.log(weather);
			weather.save();
			if (!req.body.pigeonPopulationInArea || !req.body.location || !req.body.userID) {
				console.log('record was not added, There was an issue with request missing parameters of body pigeonPopulationInArea or location or userID');
				res.status(400);
				return res.send('Location, pigeonPopulationInArea and UserID are required');
			}
			if (isNaN(req.body.pigeonPopulationInArea)) {
				console.log('record was not added, Request body parameter pigeonPopulationInArea must be an number');
				res.status(400);
				return res.send('pigeonPopulationInArea must be an number, Please correct it');	
			}
			res.status(201);
			return res.json(weather);
		}
		postEntry();
	}
	function get(req, res) {
		const query = {};
		if (req.query.userID) {
			query.userID = req.query.userID;
		}
		Weather.find(query, (err, weather) =>{
			if(err){
				return res.send(err);  
			} else {
				return res.json(weather);
			}
		});
	}
	return {post, get};
}

module.exports = weatherController;