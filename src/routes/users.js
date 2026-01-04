const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");

//!CREATE-POST
router.post("/", usersController.createAllUsers);
//!READ-GET
router.get("/", usersController.getAllUsers);
//!UPDATE-PATCH
router.patch("/:id", usersController.updateUsers);
//!DELETE-DELETE
router.delete("/:id", usersController.deleteUser);

module.exports = router;
