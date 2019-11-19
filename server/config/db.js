
var knex = require('knex')({
  client: 'pg',
  connection: {
    user: 'postgres',
		host: process.env.DATABASE_HOST || '127.0.0.1',
		database: 'test_db',
		password: 'kolax',
		port: 5432,
  }
});

module.exports = knex