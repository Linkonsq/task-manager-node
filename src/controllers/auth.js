const User = require("../models/user");
const Task = require("../models/task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");

// Signup a user
exports.signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age;

    const user = new User({
      name: name,
      email: email,
      password: password,
      age: age,
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

// Login a user
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ _id: user._id.toString() }, "somesupersecret", {
      expiresIn: "1h",
    });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.status(200).json({
      message: "Login successful",
      token: token,
      user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Logout a user with one token
exports.logout = async (req, res, next) => {
  try {
    // keep every other tokens except the request token
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Logout a user with all  tokens
exports.logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get user profile
exports.getUser = async (req, res) => {
  res.status(200).json({ message: "Fetched profile", user: req.user });
};

// Update a user
exports.updateUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));

    const result = await req.user.save();

    res.status(200).json({ message: "User updated", user: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
  try {
    // First, delete tasks associated with the user
    await Task.deleteMany({ owner: req.user._id });

    await req.user.deleteOne();

    res.status(200).json({ message: "User deleted", user: req.user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Upload user avatar
exports.uploadAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  req.user.avatar = buffer;

  await req.user.save();
  res.status(200).json({ message: "Avatar uploaded" });
};

// Delete user avatar
exports.deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(200).json({ message: "Avatar deleted" });
};

// Get user avatar
exports.getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.avatar) {
      return res.status(404).json({ message: "User has no avatar" });
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
