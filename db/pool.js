const mysql = require("mysql");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: 'express_db',
  charset: 'utf8mb4',
  timezone: 'jst',
  connectionLimit : 1,
});
pool.connect(function(error) {
  if (error) {
    throw error;
  }
  console.log("connected");
});

module.exports = pool;
