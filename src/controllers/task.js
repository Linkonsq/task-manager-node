const Task = require("../models/task");

exports.createTask = async (req, res) => {
  try {
    const description = req.body.description;
    const completed = req.body.completed;
    const task = new Task({
      description: description,
      completed: completed,
    });
    const result = await task.save();
    res.status(201).json({ message: "Task created", task: result });
  } catch (error) {
    res.status(400).send(error);
  }
};
