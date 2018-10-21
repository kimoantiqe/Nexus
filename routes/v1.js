const passportJWT           = require("passport-jwt");
const passport              = require('passport');
const UserController        = require('./../controllers/UserController');
const matchingService        = require('./../services/matchingService');

module.exports = function(app, passport) {

		/********  Landing **************/
		app.get('/api', function(req, res) {
		res.json({message : 'Network INC' , version : 'v1.0.0'});
		});
		/************************************/

		/********  Login **************/
		app.post('/api/user/login', UserController.login);
		/************************************/

    /************ create user ***************///C
    app.post('/api/user', UserController.create);
    /************************************/

    /********  get user **************///R
    app.get('/api/user', passport.authenticate('jwt', {session: false}) ,UserController.get );
    /************************************/

		//use this to report a like / Dislike
		//no need for another api call for now
    /********  update user **************///U
    app.put('/api/user', passport.authenticate('jwt', {session: false}),UserController.update);
    /************************************/

    /********  remove user **************///D
    app.delete('/api/user', passport.authenticate('jwt', {session: false}),UserController.remove);
    /************************************/

		/********  gets 1 potential connection  **************///R
		app.get('/api/user/getpotconn', passport.authenticate('jwt', {session: false}), matchingService.getpotconn );
		/************************************/

		/********  populates the array of potential matches for the calling user  **************///R
		app.get('/api/user/popconn', passport.authenticate('jwt', {session: false}), matchingService.popconns );
		/************************************/

};
