const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware.js");

router.get("/protected", verifyToken, (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "You are successfully authenticated to this route!",
  });
});

// Validate an existing user and issue a JWT
router.post("/login", userController.signUp);

// Register a new user
router.post("/register", userController.register);

//get a user
router.get("/info-user", verifyToken, userController.getInfoUser);

// get all users
router.get("/user-list", verifyToken, userController.getUserAll);
const mongoose = require("mongoose");
const User = mongoose.model("User");
//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
