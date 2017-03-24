exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL 
||  'mongodb://<username>:<password>@ds135790.mlab.com:35790/blog-data';
//exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'MONGODB://localhost/testblog';