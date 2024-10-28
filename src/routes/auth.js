const express = require("express");
const User = require("../models/user");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/signup", authController.signup);

router.get("/users", authController.getUsers);

router.get("/user/:id", authController.getUser);

module.exports = router;
