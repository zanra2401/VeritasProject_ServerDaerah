
require("dotenv").config()

module.exports = {
  "development": {
    "username": process.env.DEV_USER,
    "password": process.env.DEV_PASSWORD,
    "database": process.env.DEV_DB,
    "host": process.env.DEV_HOST,
    "dialect": process.env.DEV_DIALECT,
    "port": process.env.DEV_PORT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DEV_USER,
    "password": process.env.DEV_PASSWORD,
    "database": process.env.DEV_DB,
    "host": process.env.DEV_HOST,
    "dialect": process.env.DEV_DIALECT,
    "port": process.env.DEV_PORT
  }
}
