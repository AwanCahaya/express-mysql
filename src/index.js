const express = require("express");
const app = express();
const mysql = require("mysql2");
//untuk memanggil fungsi/middleware lain
const usersRouters = require("./routes/users");
const { getAllUsers, createAllUsers } = require("./controller/users");
const logRequest = require("./middleware/logs");
//DB MySQL Pool
const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "express_mysql",
  password: "",
});
//memanggil middleware
app.use(logRequest);

//! midleware untuk menerima POST JSON
app.use(express.json());
//ini cara menggunakan function/middleware dari folder lain
app.use("/users", usersRouters);
//ini kode untuk mengambil data dari data base execute untuk query
app.get("/", (req, res) => {
  dbPool.execute("SELECT * FROM users", (err, rows) => {
    if (err) {
      console.log("connection database failed");
    }
    res.json({
      massage: "GET Index Success",
      data: rows,
    });
  });
});
app.post("/", createAllUsers);
app.listen(4000, () => {
  console.log("Server Sudah Berjalan di Port 4000");
});
