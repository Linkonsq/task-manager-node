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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const totalTasks = await Task.find().countDocuments();
    const tasks = await Task.find();

    res.status(200).json({
      message: "Fetched tasks successfully",
      tasks: tasks,
      totalTasks: totalTasks,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Fetched task successfully",
      task: task,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
