const passportJWT = require("passport-jwt");
const passport = require('passport');
const UserController = require('./../controllers/UserController');
const ImageController = require('./../controllers/ImageController');
const TaskController = require('./../controllers/TaskController');
const matchingService = require('./../services/matchingService');

module.exports = function(app, passport) {

  /********  Landing **************/
  app.get('/api', function(req, res) {
    res.json({
      message: 'Nexus REST API',
      version: 'v1.0.0'
    });
  });

  /************************************/


  /* USER ROUTES */
  /********  Regular Login **************/
  app.post('/api/user/login', UserController.login);
  /************************************/

  /********  Facebook Login **************/
  app.post('/api/user/login/facebook', passport.authenticate('facebook-token', {
    session: false
  }), UserController.facebookHandler);
  /************************************/

  /************ create user ***************/ //C
  app.post('/api/user', UserController.create);
  /************************************/

  /********  get user **************/ //R
  app.get('/api/user', passport.authenticate('jwt', {
    session: false
  }), UserController.get);
  /************************************/

  /********  update user **************/ //U
  app.put('/api/user', passport.authenticate('jwt', {
    session: false
  }), UserController.update);
  /************************************/

  /********  remove user **************/ //D
  app.delete('/api/user', passport.authenticate('jwt', {
    session: false
  }), UserController.remove);
  /************************************/



  /* MATCHING ROUTES */
  /********  gets 1 potential connection  **************/ //R
  app.get('/api/user/getpotconn', passport.authenticate('jwt', {
    session: false
  }), matchingService.getpotconn);
  /************************************/

  /********  populates the array of potential matches for the calling user  **************/ //R
  app.get('/api/user/popconn', passport.authenticate('jwt', {
    session: false
  }), matchingService.popconns);
  /************************************/

  /********  gets the user profile given a user id  **************/ //R
  app.get('/api/user/getuser/', passport.authenticate('jwt', {
    session: false
  }), UserController.getuser);
  /************************************/


  /* IMAGE ROUTES */
  /************ create and connect image ***************/ //
  app.post('/api/user/image', passport.authenticate('jwt', {
    session: false
  }), ImageController.uploadImage, UserController.setUserImage);
  /********************************************/

  /************ remove old create new and connect image ***************/ //U & D
  app.put('/api/user/image', passport.authenticate('jwt', {
    session: false
  }), ImageController.removeOld, ImageController.uploadImage, UserController.setUserImage);
  /********************************************/

  /********  get user image **************/ //R
  app.get('/api/user/image', passport.authenticate('jwt', {
    session: false
  }), ImageController.get);
  /***********************************/

	/* TASK ROUTES */
  /************ create task for a user ***************/ //C
  app.post('/api/user/task',  passport.authenticate('jwt', {
    session: false
  }) ,TaskController.create , UserController.setTask);
  /************************************/

  /********  get all tasks for given user **************/ //R
  app.get('/api/user/task', passport.authenticate('jwt', {
    session: false
  }), TaskController.get);
  /************************************/

  // /********  update a task for a user **************/ //U
  // app.put('/api/user/task', passport.authenticate('jwt', {
  //   session: false
  // }), TaskController.update);
  // /************************************/
  //
  // /********  subscribe Users to a task **************/ //U
  // app.put('/api/user/task/subscribe', passport.authenticate('jwt', {
  //   session: false
  // }), TaskController.update);
  // /************************************/
  //
  // /********  unsubscribe Users to a task **************/ //U
  // app.put('/api/user/task/unsubscribe', passport.authenticate('jwt', {
  //   session: false
  // }), TaskController.update);
  // /************************************/
  //

  // /********  remove a task for a user **************/ //D
  // app.delete('/api/user/task', passport.authenticate('jwt', {
  //   session: false
  // }), TaskController.remove);
  // /************************************/
};
