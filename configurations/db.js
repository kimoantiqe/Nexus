let dbConfig = {}

dbConfig.dialect   = process.env.DB_DIALECT    || 'mongo';
dbConfig.host      = process.env.DB_HOST       || 'localhost';
dbConfig.port      = process.env.DB_PORT       || '27017';
dbConfig.url       = process.env.DB_URL        || 'mongodb://127.0.0.1:27017';
dbConfig.name      = process.env.DB_NAME       || 'NetworkINC';
dbConfig.user      = process.env.DB_USER       || 'root';
dbConfig.password  = process.env.DB_PASSWORD   || 'db-password';

module.exports = dbConfig;
