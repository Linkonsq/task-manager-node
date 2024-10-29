const User = require("../models/user");

// Signup a user
exports.signup = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
      name: name,
      email: email,
      password: password,
    });
    const result = await user.save();
    res.status(201).json({ message: "User created", user: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const totalUsers = await User.find().countDocuments();
    const users = await User.find();

    res.status(200).json({
      message: "Fetched users successfully",
      users: users,
      totalUsers: totalUsers,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get a single user
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Fetched user successfully",
      user: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.password = password;

    const result = await user.save();
    res.status(200).json({ message: "User updated", user: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
