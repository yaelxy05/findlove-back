const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Package pour les variables d'environements
require("dotenv").config();

exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    console.log("message error login :", error);
    res.status(500).json({ error: error.message });
  }
};
exports.register = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    password,
    city,
    sexe,
    search,
    birthdate,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    city,
    firstname,
    lastname,
    birthdate,
    sexe,
    search,
    email,
    password: passwordHash,
  });
  console.log(newUser);

  try {
    newUser.save().then((user) => {
      res.status(201).json({ success: true, user: user });
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

exports.getInfoUser = async (req, res, next) => {
  const user = await User.find({ _id: req.user.id });

  console.log(user);
  try {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
      user,
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

exports.getUserAll = async (req, res, next) => {
  // $ne avec req.user.id permet de filtrer tous les user sauf celui qui est
  const userAll = await User.find({ _id: { $ne: req.user.id } });

  try {
    res.status(200).json({
      success: true,
      userAll,
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};
