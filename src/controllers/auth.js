const User = require("../models/user");

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
