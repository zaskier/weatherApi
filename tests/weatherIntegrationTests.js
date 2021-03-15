require('should');
const request = require('supertest');
const mongoose = require('mongoose');
process.env.ENV = 'Test';
const app = require('../app.js');
const Weather = mongoose.model('Weather');
const agent = request.agent(app);

describe('Weather Crud Test', () => {
	it('should allow a weather to be posted and return location and _it', (done) => {
		const weatherPost = { userID: 'wojciech.iskierka@protonmail.com', location: 'Palo Alto', pigeonPopulationInArea: '7' };

		agent.post('/api/weather')
			.send(weatherPost)
			.expect(200)
			.end((err, results) => {
				//console.log(results); //comment for clear test results
				//results.body.location.should.not.equal('NOT Palo NOT alto');
				results.body.should.have.property('_id');
				done();
			});
	});

	afterEach((done) => {
		Weather.deleteMany({}).exec();
		done();
	});

	after((done) => {
		mongoose.connection.close();
		app.server.close(done());
	});
});