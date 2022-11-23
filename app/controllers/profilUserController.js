const mongoose = require("mongoose");
const ProfilUser = mongoose.model("ProfilUser");
const User = mongoose.model("User");

exports.profil = (req, res, next) => {
  // TODO
};
exports.createProfil = async (req, res, next) => {
  // On retourne l'id de l'user en paramètre de l'url
  const { id } = req.params;
  const user = await User.findById(id);
  console.log(user)
  const newProfil = await new ProfilUser({
    userId: user._id,
    weight: req.body.weight,
    size: req.body.size,
    hairColor: req.body.hairColor,
    hairSize: req.body.hairSize,
  });

  try {
    
    newProfil.save().then((response) => {
      res.status(201).json({ success: true, response: response });
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
};
