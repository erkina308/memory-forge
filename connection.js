const { Pool } = require("pg");
// const pathToProd = `${__dirname}/./.env.production`;
// require("dotenv").config({
//   path: pathToProd,
// });
require("dotenv").config();

// const db = new Pool({
//   user: process.env.DB_USER,
//   host: "localhost",
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: 5432,
// });

// const config = {};

// config.connectionString = process.env.DATABASE_URL;
// config.max = 2;

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
