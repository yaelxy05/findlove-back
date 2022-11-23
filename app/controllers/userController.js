const mongoose = require("mongoose");
const User = mongoose.model("User");
const utils = require("../lib/utils");

// Package pour les variables d'environements
require("dotenv").config();

exports.signUp = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.register = (req, res, next) => {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    city: req.body.city,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    sexe: req.body.sexe,
    search: req.body.search,
    email: req.body.email,
    username: req.body.username,
    hash: hash,
    salt: salt,
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
  const user = await req.user;
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
  const userAll = await User.find();

  try {
    res.status(200).json({
      success: true,
      userAll,
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};
