const passportJWT           = require("passport-jwt");
const passport              = require('passport');
const UserController        = require('./../controllers/UserController');
const ImageController        = require('./../controllers/ImageController');
const matchingService        = require('./../services/matchingService');

module.exports = function(app, passport) {



	/********  Landing **************/
	app.get('/api', function(req, res) {
		res.json({message : 'Nexus REST API' , version : 'v1.0.0'});
	});
	/************************************/


	/* USER ROUTES */ 

	/********  Login **************/
	app.post('/api/user/login', UserController.login);
	/************************************/

    /************ create user ***************///C
    app.post('/api/user', UserController.create);
    /************************************/

    /********  get user **************///R
    app.get('/api/user', passport.authenticate('jwt', {session: false}) ,UserController.get );
    /************************************/


    /********  update user **************///U
    app.put('/api/user', passport.authenticate('jwt', {session: false}),UserController.update);
    /************************************/

    /********  remove user **************///D
    app.delete('/api/user', passport.authenticate('jwt', {session: false}),UserController.remove);
    /************************************/


    /* MATCHING ROUTES */

	/********  gets 1 potential connection  **************///R
	app.get('/api/user/getpotconn', passport.authenticate('jwt', {session: false}), matchingService.getpotconn );
	/************************************/

	/********  populates the array of potential matches for the calling user  **************///R
	app.get('/api/user/popconn', passport.authenticate('jwt', {session: false}), matchingService.popconns );
	/************************************/

	/********  gets the user profile given a user id  **************///R
	app.get('/api/user/getuser', passport.authenticate('jwt', {session: false}), UserController.getuser );
	/************************************/


	/* IMAGE ROUTES */

	/************ create and connect image ***************///C
	app.post('/api/user/image',passport.authenticate('jwt', {session: false}), ImageController.uploadImage , UserController.setUserImage);
	/********************************************/

 	/************ remove old create new and connect image ***************///U & D
 	app.put('/api/user/image', passport.authenticate('jwt', {session: false}), ImageController.removeOld, ImageController.uploadImage ,UserController.setUserImage );
 	/********************************************/
 	
    /********  get user image **************///R
    app.get('/api/user/image', passport.authenticate('jwt', {session: false}), ImageController.get);
    /***********************************/

};
