const { migrate } = require('postgres-migrations');
const client = require('../libs/pgsql');

migrate({client}, __dirname+"/migrations/")