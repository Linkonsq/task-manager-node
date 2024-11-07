const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");
const isAuth = require("../middleware/is-auth");

router.post("/task", isAuth, taskController.createTask);

router.get("/tasks", isAuth, taskController.getTasks);

router.get("/task/:id", isAuth, taskController.getTask);

router.patch("/task/:id", isAuth, taskController.updateTask);

router.delete("/task/:id", isAuth, taskController.deleteTask);

module.exports = router;
