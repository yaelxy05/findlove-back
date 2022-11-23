const express = require("express");
const path = require("path");
const passport = require("passport");
const app = express();
const http = require("http");
const cors = require("cors");


app.use(cors());

/***
 *  ------------- Socket IO --------------------
 */
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // quand un user est connecté
  console.log("a user is connected.");

  // prend l'userId et le socketId de l'user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // envoie et récupère les messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // quand un user est déconnecté
  socket.on("disconnect", () => {
    console.log("a user is disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

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
require("./app/models/Chat");
require("./app/models/Message");
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
