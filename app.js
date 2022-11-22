const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const app = express();


/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require("./app/config/database");

// Must first load the models
require("./app/models/User");
require("./app/models/ProfilUser");
// Pass the global passport object into the configuration function
require("./app/config/passport")(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory
app.use(express.static(path.join(__dirname, "public")));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require("./app/router"));

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:8000
app.listen(8000, () => {
  console.log("Server running");
});

module.exports = app;
