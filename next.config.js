require('dotenv').config()

module.exports = {
  env: {
    MY_SQL_USER: process.env.MY_SQL_USER,
    MY_SQL_PW: process.env.MY_SQL_PW,
    MY_SQL_URL: process.env.MY_SQL_URL,
    MY_SQL_DB: process.env.MY_SQL_DB,
  },
};