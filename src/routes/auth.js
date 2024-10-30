const express = require("express");
const User = require("../models/user");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/users", authController.getUsers);

router.get("/user/:id", authController.getUser);

router.patch("/user/:id", authController.updateUser);

router.delete("/user/:id", authController.deleteUser);

module.exports = router;
