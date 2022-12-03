const router = require("express").Router();
const profilUserController = require("../controllers/profilUserController");
const { verifyToken } = require("../middlewares/authMiddleware.js");

router.post(
  "/profil/create/:id",
  verifyToken,
  profilUserController.createProfil
);

router.get("/profil", verifyToken, (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    msg: "You are successfully authenticated to this route!",
    user,
  });
});

module.exports = router;
