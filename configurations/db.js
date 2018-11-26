let dbConfig = {};

dbConfig.dialect   = process.env.DB_DIALECT    || "mongo";
//use this for testing, easier to use, only need to run npm start to start the server and thats it
dbConfig.url       = process.env.DB_URL        || "mongodb://admin:adminadmin2@ds045097.mlab.com:45097/nexus-restapi";

dbConfig.name      = process.env.DB_NAME       || "NetworkINC";


module.exports = dbConfig;
