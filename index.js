require('dotenv').config();
const express  		          = require('express');
const app      		    	    = express();
const appConfig    	       	= require('./configurations/app');
const mongoose	        	  = require('mongoose');
const passport          		= require('passport');
const morgan            		= require('morgan');
const bodyParser       		  = require('body-parser');


/*Configuration*/
const models = require("./models");
mongoose.set('debug', true);
require('./configurations/passport')(passport);
app.use(morgan('dev'));
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

/*Routes*/
require('./routes/v1.js')(app, passport);


/*RunServer*/
app.listen('3000' );
console.log('Server has successfully started on PORT: 3000');
