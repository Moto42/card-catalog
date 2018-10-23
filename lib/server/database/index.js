//

const config = require('./databaseConfig.js');
const mysql = require('mysql');

const database = mysql.createConnection({
  host : config.host,
  user : config.login,
  password : config.password,
  database: process.env.dbname,
})

module.exports = database;
