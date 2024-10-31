const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", isAuth, authController.logout);

router.post("/logoutAll", isAuth, authController.logoutAll);

router.get("/user/me", isAuth, authController.getUsers);

router.patch("/user/me", isAuth, authController.updateUser);

router.delete("/user/me", isAuth, authController.deleteUser);

module.exports = router;
