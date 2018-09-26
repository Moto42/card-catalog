//

const config = require('./databaseConfig.js');
const mysql = require('mysql');

const database = mysql.createConnection({
  host : 'localhost',
  user : config.login,
  password : config.password,
  database: 'card-catalog',
})

module.exports = database;
