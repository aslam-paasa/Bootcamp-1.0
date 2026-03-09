/**
 * Database Configuration:
 * 1. Pool    : a pool of connections to the database
 * 2. user    : the user of the database
 * 3. password: the password of the database
 * 4. host    : the host of the database
 * 5. port    : the port of the database
 * 6. database: the name of the database
 */

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "kthl8822",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;
