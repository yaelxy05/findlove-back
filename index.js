// Package pour express (server)
const express = require("express");
const morgan = require("morgan");

// Package pour les variables d'environements
require("dotenv").config();

// On lance le server express
const app = express();
app.use(express.json());

const userRoute = require("./app/router/userRoute");
// On récupère le router
// ### route User ###
app.use("/api", userRoute);



app.use(morgan("dev"));


// IMPORT Db.js mongodb database
const mongoose = require("./app/config/db");
mongoose.set('debug', true);

// gérer les CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST, PUT,DELETE,PATCH,OPTIONS"
  );
  next();
});

// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});
// Si la variable d'environement PORT n'est pas dispo le port sera 8000
const port = process.env.PORT || 8000;

app.listen(port || 8000, () =>
  console.log(`Listening on http://localhost:${port}`)
);
