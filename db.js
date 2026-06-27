require('dotenv').config()
const { Pool } = require("pg")

//Create reusable connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, //Maximum 10 database connections can exist at the same time.
    idleTimeoutMillis: 30000
    //If a connection is unused for 30 seconds, the pool closes it.This saves memory and system resources.

})

module.exports = pool;