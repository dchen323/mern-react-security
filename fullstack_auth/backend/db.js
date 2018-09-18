const { Pool } = require("pg");

const dbConfig = require("./secret/db_configuration");

const pool = new Pool(dbConfig);

module.exports = pool;
