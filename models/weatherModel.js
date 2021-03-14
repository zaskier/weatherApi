const mongoose = require('mongoose');

const { Schema } = mongoose;

const weatherModel = new Schema(
	{
		userID: { type: String },
		location: { type: String },
		weatherStationID: { type: String },
		weather: { type: String },
		pigeonPopulationInArea: { type: Number },
	}
);

module.exports = mongoose.model('Weather', weatherModel);