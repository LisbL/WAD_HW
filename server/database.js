 // database.js
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "P0st1m33s",
    database: "postitapp",
    host: "localhost",
    port: "5432"
});

module.exports = pool;