const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const fileUpload = require("../middleware/file-upload");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", isAuth, authController.logout);

router.post("/logoutAll", isAuth, authController.logoutAll);

router.get("/user/me", isAuth, authController.getUser);

router.patch("/user/me", isAuth, authController.updateUser);

router.delete("/user/me", isAuth, authController.deleteUser);

router.post(
  "/user/me/avatar",
  isAuth,
  fileUpload.single("avatar"),
  authController.uploadAvatar,
  (error, req, res, next) => {
    // This middleware will catch any errors from the previous middleware
    res.status(400).json({ error: error.message });
  }
);

router.delete("/user/me/avatar", isAuth, authController.deleteAvatar);

module.exports = router;
