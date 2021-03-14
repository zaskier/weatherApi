const express = require('express');

function routes(Weather){
	const weatherRouter= express.Router();
	weatherRouter.route('/weather')
		.get((req, res)=>{

			const query = {};
			if (req.query._id) {
				query._id = req.query._id;
			}
			Weather.find(query, (err, weather) =>{
				if(err){
					return res.send(err);
				}
				else{
					return res.json(weather);
				}
			});
		})
		.post((req, res) => {
			const weather = new Weather(req.body);
			console.log('record was added');
			console.log(weather);
			weather.save();
			return res.status(201).json(weather);
		});

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
		.get((req, res) => res.json(req.weather))
		.put((req, res) => {
			const {weather} = req;
			weather.userID = req.body.userID;
			weather.location = req.body.title;
			weather.weatherStationID = req.body.Content; //TODO replace with small letter 
			weather.weather = req.body.weather;
			weather.pigeonPopulationInArea = req.body.pigeonPopulationInArea;
			req.weather.save((err) => {
				if (err) {
					return res.json(weather);
				}
				return res.json(weather);
			});})
		.patch((req, res) =>{
			const {weather} = req;
			// ${typeof req.body.userID === "undefined"  ? `` : `${req.body.userID}",`}
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
					return res.json(weather);
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