let dbConfig = {}

dbConfig.dialect   = process.env.DB_DIALECT    || 'mongo';
dbConfig.url       = process.env.DB_URL        || 'mongodb://networkinc:yQFp5qdTwCC7kXwd52gve0YSrEK93ISifxWjkQMng1JjSLAUxfDtfkDDWIBLqD1IV82I369msbniX7shoQ8SkQ==@networkinc.documents.azure.com:10255/?ssl=true';
dbConfig.name      = process.env.DB_NAME       || 'NetworkINC';


module.exports = dbConfig;
