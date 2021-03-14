const express = require('express');
const weatherController = require('../controllers/weatherController.js');
function routes(Weather){
	const weatherRouter= express.Router();
	const controller = weatherController(Weather);
	weatherRouter.route('/weather')
		.get(controller.get)
		.post(controller.post)

	weatherRouter.use('/weather/:entryID', (req, res, next) =>{
		Weather.findById(req.params.entryID, (err, weather) => {
			if (err) {
				return res.send(err);
			}
			if(weather){
				req.weather = weather;
				return next();
			}
			return res.sendStatus(404);
		});
	});
	weatherRouter.route('/weather/:entryID')
		.get((req, res) => res.json(req.weather ))
		.put((req, res) => {
			req.weather.save((err) => {
				if (err) {
					return res.json(weather);
				}
				return res.json(weather);
			});
			const {weather} = req;
			weather.userID = req.body.userID;
			weather.location = req.body.location;
			weather.weatherStationID = req.body.weatherStationID;
			weather.weather.shortDescription = req.body.weather.shortDescription;
			weather.weather.temperature = req.body.weather.temperature;
			weather.weather.humidity = req.body.weather.humidity;
			weather.weather.pressure = req.body.weather.pressure;
			weather.weather.visibility = req.body.weather.visibility;
			weather.weather.windSpeed = req.body.weather.windSpeed;
			weather.weather.windDeg = req.body.weather.windDeg;
			weather.weather.clouds = req.body.weather.clouds;
			weather.weather.matchedLocatioName = req.body.weather.matchedLocatioName;
			weather.pigeonPopulationInArea = req.body.pigeonPopulationInArea;
		})
		.patch((req, res) =>{
			const {weather} = req;
			if (req.body._id){
				delete req.body._id;
			}
			Object.entries(req.body).forEach((item) =>{

				const key = item[0];
				const value = item[1];
				weather [key] = value;
			});
			req.weather.save((err) => {
				if (err) {
					return res.json(err);
				}
				return res.json(weather);
			});
		})
		.delete((req, res) =>{
			req.weather.remove((err)=> {
				if (err) {
					return res.send(err);
				}
				console.log(`Entry ' ${req.params.entryID} ' was deleted`);
				return res.sendStatus(204);
			});  
		});
	return weatherRouter;}

module.exports = routes;