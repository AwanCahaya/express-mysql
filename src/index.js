const express = require("express");
const app = express();
//untuk memanggil fungsi/middleware lain
const usersRouters = require("./routes/users");
const { getAllUsers, createAllUsers } = require("./controller/users");
const logRequest = require("./middleware/logs");
//memanggil middleware
app.use(logRequest);

//! midleware untuk menerima POST JSON
app.use(express.json());
//ini cara menggunakan function/middleware dari folder lain
app.use("/users", usersRouters);
//ini kode untuk mengambil data dari data base execute untuk query
app.get("/", getAllUsers);
app.post("/", createAllUsers);
app.listen(4000, () => {
  console.log("Server Sudah Berjalan di Port 4000");
});
