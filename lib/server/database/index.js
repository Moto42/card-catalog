//

const config = require('./databaseConfig.js');
const mysql = require('mysql');

const database = {};

database.query = (...args) => {
  newConnection = mysql.createConnection({
    host : config.host,
    user : config.login,
    password : config.password,
    database: process.env.dbname,
  })
  newConnection.query(...args);
  newConnection.end();
}

module.exports = database;
