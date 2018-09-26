const secure = require('./secure');

const databaseConfig = {
  login: secure.login,
  password: secure.password,
  host: 'localhost',
  port: '3306',
};

module.exports = databaseConfig;
