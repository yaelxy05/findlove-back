// Package pour les variables d'environements
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected!!"))
  .catch((err) => console.log(err));

module.exports = mongoose;
