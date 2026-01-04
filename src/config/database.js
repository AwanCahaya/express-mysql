// ini untuk kodensi ke database
const mysql = require("mysql2/promise");
const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "express_mysql",
  password: "",
});
module.exports = dbPool;
