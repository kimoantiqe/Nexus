const passportJWT           = require("passport-jwt");
const passport              = require('passport');

module.exports = function(app, passport) {

	/********  Landing **************/
	app.get('/api', function(req, res) {
		res.json({message : 'Network INC' , version : 'v1.0.0'});
	});
	/************************************/

};
