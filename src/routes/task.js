const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

router.post("/post", taskController.createTask);

module.exports = router;
