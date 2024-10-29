const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

router.post("/task", taskController.createTask);

router.get("/tasks", taskController.getTasks);

router.get("/task/:id", taskController.getTask);

router.patch("/task/:id", taskController.updateTask);

router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
