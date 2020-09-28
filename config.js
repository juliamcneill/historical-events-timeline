require('dotenv').config();

const config = {
  CLEARDB_DATABASE_URL: process.env.CLEARDB_DATABASE_URL,
};

module.exports = config;
