//Template tests To be done in the future
// const { describe } = require('mocha');
// const should = require('should');
// const sinon = require('sinon');
// const weatherController = require('../controllers/weatherController');

// describe('Weather controller Tests:', () => {
// 	describe('post', () => {
// 		it('should not allow an empty location on post', () =>{
// 			const Weather = function (weather) {
// 				this.save = () => {};
// 				const req ={
// 					body: {
// 						location: 'Paris',  
// 						userID: 'wojciech.iskierka@protonmail.com',
// 						pigeonPopulationInArea: '295'
// 					}
// 				};

// 				const res ={
// 					status: sinon.spy(),
// 					send: sinon.spy(),
// 					json: sinon.spy()
// 				};
// 				const controller = weatherController(Weather);
// 				controller.post(req, res);
// 				res.status.calledWith(400).should.equal(true , `Bad Status ${res.status.args[0][0]}`);
// 				res.send.calledWith('Location is required').should.equal(true);
// 			};
// 		});
// 	});
// });
