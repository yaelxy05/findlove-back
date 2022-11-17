const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const passwordValidator = require("../middlewares/passwordMiddleware");

// @route GET && POST /users ## passwordValidator verifie si le mot de passe est sécurisé
router.post("/register", passwordValidator, userController.signUp);

router.post("/login", userController.login);

module.exports = router;
