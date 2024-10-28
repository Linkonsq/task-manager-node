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

exports.getTasks = async (req, res) => {
  try {
    const totalTasks = await Task.find().countDocuments();
    const tasks = await Task.find();

    res.status(200).json({
      message: "Fetched tasks successfully",
      tasks: tasks,
      totalTasks: totalTasks,
    });
  } catch (error) {
    res.status(500).send(error);
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
  } catch (error) {
    res.status(500).send(error);
  }
};
