//ini hanya untuk query ke database tidak ada callback/function yg di jalankan
const dbPool = require("../config/database");
getAllUsersDB = () => {
  const queryMySql = "SELECT * FROM users";
  return dbPool.execute(queryMySql);
};
module.exports = { getAllUsersDB };
