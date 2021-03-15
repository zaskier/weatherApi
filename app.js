const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express( );
if (process.env.ENV === 'Test') {
	console.log('This is a test');
	const db = mongoose.connect('mongodb://localhost/weather_Test');
} else {
	console.log('This is for real');
	const db = mongoose.connect('mongodb://localhost/weather-Prod');
}
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;
const Weather = require('./models/weatherModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const weatherRouter =require('./routes/weatherRouter')(Weather);

app.use('/api',weatherRouter);

app.get('/', (req, res)=>{
	res.send('Weather API');
});

app.server = app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
module.exports = app;