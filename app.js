const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express( );
const db = mongoose.connect('mongodb://localhost/weather');
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

app.listen(port, ()=>{
	console.log(`Running on Port : ${port}` );
});