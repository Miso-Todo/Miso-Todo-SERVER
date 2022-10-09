const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    dialect: process.env.DEV_DB_DIALECT,
    port: process.env.DEV_DB_PORT,
    timezone: "+09:00"
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT,
    port: process.env.TEST_DB_PORT,
    timezone: "+09:00"
  },
  production: {
    username: process.env.PRO_DB_USERNAME,
    password: process.env.PRO_DB_PASSWORD,
    database: process.env.PRO_DB_NAME,
    host: process.env.PRO_DB_HOST,
    dialect: process.env.PRO_DB_DIALECT,
    port: process.env.PRO_DB_PORT,
    timezone: "+09:00"
  },
};