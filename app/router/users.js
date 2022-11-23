const router = require("express").Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

// Validate an existing user and issue a JWT
router.post("/login", userController.signUp);

// Register a new user
router.post("/register", userController.register);

//get a user
router.get(
  "/info-user",
  passport.authenticate("jwt", { session: false }),
  userController.getInfoUser
);

// get all users
router.get(
  "/user-list",
  passport.authenticate("jwt", { session: false }),
  userController.getUserAll
);

module.exports = router;
