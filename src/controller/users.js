const { json } = require("express");

const getAllUsers = (req, res) => {
  const data = {
    id: 1,
    nama: "Darmawan",
    email: "darmawan@gmail.com",
    alamat: "Lamongan",
  };
  res.json({
    massage: "GET All Users Success",
    data: data,
  });
};
//di post ini indikator suksesnya kita bisa menerima data req.body yg di kirim dari frond an sehingga bisa kita simpan ke database atau kita olah lagi
const createAllUsers = (req, res) => {
  res.json({
    massage: "POST All Users Success",
    //ini req.body untuk menangkap isi dari req user yg di kirim frondand
    data: req.body,
  });
};
//di patch indikator suksesnya kita bisa menerima params & req.body yg di kirim dari frondand yg akan kita editkan ke database atau kita oleh di controller
const updateUsers = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.json({
    massage: "PATCH users Success",
    id,
    data: req.body,
  });
};
//di delete ini indikatornya sukses express bisa menerima id data yg di delete dari frondand
const deleteUser = (req, res) => {
  const { id } = req.params;
  res.json({
    massage: "DELETE user Success",
    data: {
      id: id,
      nama: "Juri",
      email: "Juri@gmail.com",
      alamat: "Semarang",
    },
  });
};
module.exports = { getAllUsers, createAllUsers, updateUsers, deleteUser };
