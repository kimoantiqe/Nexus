let dbConfig = {}

dbConfig.dialect   = process.env.DB_DIALECT    || 'mongo';
dbConfig.url       = process.env.DB_URL        || 'mongodb://nexus-restapi:bwwJQw27yVAyXVcXfC0jf3LynSCn4E9jvY3vvG86DU2sXAjMpGzUsvoBlV65uVi2mXR8Fv2aYaESRdfv3DPp2Q%3D%3D@nexus-restapi.documents.azure.com:10255/?ssl=true';
dbConfig.name      = process.env.DB_NAME       || 'NetworkINC';


module.exports = dbConfig;
