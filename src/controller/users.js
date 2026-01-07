const { json } = require("express");
const userModels = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    const [data] = await userModels.getAllUsersDB();
    res.json({
      massage: "GET All Users Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      massage: "Server Error",
      serverMassage: error,
    });
  }
};
//di post ini indikator suksesnya kita bisa menerima data req.body yg di kirim dari frond an sehingga bisa kita simpan ke database atau kita olah lagi
const createAllUsers = async (req, res) => {
  try {
    //tangkap nilai body
    const { body } = req;
    //panggil models untuk menyimpan ke database
    await userModels.dynamicCreateUsersDB(body);
    //merespon ke users
    res.json({
      massage: "POST All Users Success",
      //ini req.body untuk menangkap isi dari req user yg di kirim frondand
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      massage: "Server Error",
      serverMassage: error,
    });
  }
};
//di patch indikator suksesnya kita bisa menerima params & req.body yg di kirim dari frondand yg akan kita editkan ke database atau kita oleh di controller
const updateUsers = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    await userModels.dynamicUpdatedUsersDB(body, id);
    res.json({
      massage: "PATCH users Success",
      id,
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      massage: "Server Error",
      serverMassage: error,
    });
  }
};
//di delete ini indikatornya sukses express bisa menerima id data yg di delete dari frondand
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModels.deleteUsersDB(id);
    res.json({
      massage: "DELETE user Success",
      data: req.params,
    });
  } catch (error) {
    res.status(500).json({
      massage: "Server Error",
      serverMassage: error,
    });
  }
};
module.exports = { getAllUsers, createAllUsers, updateUsers, deleteUser };
