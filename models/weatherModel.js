const mongoose = require('mongoose');

const { Schema } = mongoose;

const weatherModel = new Schema(
	{
		userID: { type: String },
		location: { type: String },
		weatherStationID: { type: String },
		weather: {
			shortDescription: { type: String },
			temperature: { type: String },
			humidity: { type: String },
			pressure:{ type: String },
			visibility:{ type: String },
			windSpeed:{ type: String },
			windDeg:{ type: String },
			clouds:{ type: String },
			matchedLocatioName:{ type: String },
		},
		pigeonPopulationInArea: { type: Number },
	}
);

module.exports = mongoose.model('Weather', weatherModel);