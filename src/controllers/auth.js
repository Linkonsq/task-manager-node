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
  } catch (error) {
    res.status(400).send(error);
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
  } catch (error) {
    res.status(400).send(error);
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
  } catch (error) {
    res.status(404).send(error);
  }
};
