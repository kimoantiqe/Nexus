require('dotenv').config();
const express  		          = require('express');
const app      		    	    = express();
const appConfig    	       	= require('./configurations/app');
const mongoose	        	  = require('mongoose');
const passport          		= require('passport');
const morgan            		= require('morgan');
const bodyParser       		  = require('body-parser');
const pe            = require('parse-error');

/*Configuration*/
const models = require("./models");
// /mongoose.set('debug', true);
require('./configurations/passport')(passport);
//app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb', extended: true})); // get information from html forms
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(passport.initialize());

/*Routes*/
require('./routes/v1.js')(app, passport);


/*RunServer*/
var Nexus = app.listen(appConfig.port);
console.log('Server has successfully started on PORT: ' + appConfig.port);


/*****  HANDLE REJECTIONS AND ERRORS*****/
process.on('unhandledRejection', (error) => {
    console.error('Encountered an error', pe(error));
});

app.use(function(req, res, next) {
  var err = new Error('You are trying to access a non-existent route');
  err.status = 404;
  next(err);
});
/***************************************/

module.exports = Nexus; // for testing
