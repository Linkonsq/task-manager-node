const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", isAuth, authController.logout);

router.post("/logoutAll", isAuth, authController.logoutAll);

router.get("/users/me", isAuth, authController.getUsers);

router.get("/user/:id", authController.getUser);

router.patch("/user/:id", authController.updateUser);

router.delete("/user/:id", authController.deleteUser);

module.exports = router;
