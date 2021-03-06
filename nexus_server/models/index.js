var fs              = require('fs');
var path            = require('path');
var basename        = path.basename(__filename);
var models          = {};
const mongoose      = require('mongoose');
const dbConfig      = require('../configurations/db.js');


var files = fs
.readdirSync(__dirname)
.filter((file) => {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach((file) => {
	var filename = file.split('.')[0];
	var modelName = filename.charAt(0).toUpperCase() + filename.slice(1);
	models[modelName] = require('./'+file);
});

mongoose.Promise = global.Promise; //set mongo up to use promises

const dbURL = ( process.env.NODE_ENV === 'test')? dbConfig.testurl: dbConfig.url;

	mongoose.connect(dbURL, { useNewUrlParser: true }).catch((err) => {
		console.log('*** Can Not Connect to Mongo Server:', dbURL);
	});
	console.log('*** Connected to test database: ', dbURL);


mongoose.set('useCreateIndex', true);

let conn = mongoose.connection;
module.exports.mongoose = mongoose;
module.exports.conn = conn;


conn.once('open', () => {
	console.log('Connected to mongoDB at '+dbURL);
});

conn.on('error', (error) => {
	console.log("Mongo error", error);
});


module.exports.models = models;
