let appConfig = {}

appConfig.app          = process.env.APP   || 'development';
appConfig.port         = process.env.PORT  || '3000';

module.exports = appConfig;
