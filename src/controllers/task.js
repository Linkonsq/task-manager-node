const Task = require("../models/task");

// Create a task
exports.createTask = async (req, res) => {
  try {
    const description = req.body.description;
    const completed = req.body.completed;
    const owner = req.user._id;
    const task = new Task({
      description: description,
      completed: completed,
      owner: owner,
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

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const totalTasks = await Task.find({
      owner: req.user._id,
    }).countDocuments();

    const tasks = await Task.find({ owner: req.user._id });

    // alternative way to fetch tasks
    // await req.user.populate("tasks").execPopulate();

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

// Get a single task
exports.getTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId, owner: req.user._id });

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

// Update a task
exports.updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const taskId = req.params.id;

    const task = await Task.findOne({ _id: taskId, owner: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // const description = req.body.description;
    // const completed = req.body.completed;

    // task.description = description;
    // task.completed = completed;

    // alternative way to update the task without hardcoding the fields
    updates.forEach((update) => (task[update] = req.body[update]));

    const result = await task.save();
    res.status(200).json({ message: "Task updated", task: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({
      _id: taskId,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", task: task });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
