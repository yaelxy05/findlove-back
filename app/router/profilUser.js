const router = require("express").Router();
const profilUserController = require("../controllers/profilUserController");
const passport = require("passport");

router.post(
  "/profil/create/:id",
  passport.authenticate("jwt", { session: false }),
  profilUserController.createProfil
);

router.get(
  "/profil",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        msg: "You are successfully authenticated to this route!",
      });
  }
);

module.exports = router;
