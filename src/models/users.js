//ini hanya untuk query ke database tidak ada callback/function yg di jalankan
const dbPool = require("../config/database");
const getAllUsersDB = () => {
  const queryMySql = "SELECT * FROM users";
  return dbPool.execute(queryMySql);
};
//! Dua Jenis Models untuk Create (Dynamic & Static)
//* Jenis Menambahkan/Add data dengan Static
const createAllUserDB = (body) => {
  const queryMySql = `INSERT INTO users(name,email,address) VALUES(?,?,?)`;
  const values = [body.name, body.email, body.address];
  return dbPool.execute(queryMySql, values);
};
//* Jenis Menambahkan/Add data dengan Dynamic
const dynamicCreateUsersDB = (body) => {
  const queryKey = [];
  const queryValues = [];
  const paramsValues = [];
  const allowData = ["name", "email", "address"];
  Object.keys(body).forEach((key) => {
    if (allowData.includes(key)) {
      queryKey.push(key);
      paramsValues.push("?");
      queryValues.push(body[key]);
    }
  });

  if (queryKey.length === 0) {
    return Promise.reject(new Error("Tidak ada data valid yang diupdate"));
  }
  const textKey = queryKey.join(", ");
  const textValues = paramsValues.join(", ");
  const queryMySql = `INSERT INTO users(${textKey}) VALUES(${textValues})`;

  return dbPool.execute(queryMySql, queryValues);
};

//! Dua Jenis Models untuk Update (Dynamic & Static)
//* Jenis Updated Static
const updateAllUserDB = (body, id) => {
  const queryMySql = `UPDATE users SET name=?, email=?, address=? WHERE (id=?)`;
  const values = [body.name, body.email, body.address, id];
  return dbPool.execute(queryMySql, values);
};
//* Jenis Updated Dynamic
const dynamicUpdatedUsersDB = (body, id) => {
  //Siapkan wadah
  const queryKey = [];
  const queryValues = [];
  //cek keamanan kesesuaian data yg boleh di edit
  const allowData = ["name", "email", "address"];
  Object.keys(body).forEach((key) => {
    if (allowData.includes(key)) {
      queryKey.push(`${key}=?`);
      queryValues.push(body[key]);
    }
  });
  //cek jika array korong
  if (queryKey.length === 0) {
    return Promise.reject(new Error("Tidak ada data valid yang diupdate"));
  }
  //ini untuk merubah array jadi text
  const textsQuery = queryKey.join(", ");
  //ini untuk merangkai jadi query ke database
  const queryMySql = `UPDATE users SET ${textsQuery} WHERE id=?`;
  //ini untuk memasukkan nilai id ke values karena butuh ada value id di bagian belakang
  queryValues.push(id);
  return dbPool.execute(queryMySql, queryValues);
};

const deleteUsersDB = (id) => {
  const queryMySql = `DELETE FROM users WHERE (id=?)`;
  return dbPool.execute(queryMySql, [id]);
};
module.exports = {
  getAllUsersDB,
  createAllUserDB,
  dynamicCreateUsersDB,
  updateAllUserDB,
  dynamicUpdatedUsersDB,
  deleteUsersDB,
};
