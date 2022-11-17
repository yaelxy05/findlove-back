const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Package pour les variables d'environements
require("dotenv").config();
exports.signUp = (req, res, next) => {
  //hasher le mot de passe
  bcrypt
    .hash(req.body.password, 10) // salt= 10
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur créer" }))
        .catch((e) => res.status(400).json({ e }).send());
    })
    .catch((e) => res.status(500).json({ e }).send(console.log(e)));
};
exports.login = (req, res, next) => {
  // Vérification si l'user existe déjà
  User.findOne({ email: req.body.email })
    // si l'email n'est pas présent, il n'existe pas
   
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "utilisateur inexistant" });
      }

      // Contrôler la validation du password envoyer par le front
      bcrypt
        .compare(req.body.password, user.password)
        .then((controlPassword) => {
          console.log("controle du mot de passe", controlPassword);

          if (!controlPassword) {
            return res
              .status(401)
              .json({ error: "le mot de passe est incorrect" });
          }

          // si le mot de passe est correct
          res.status(200).json({
            // encodage de userId pour la création de nouveau objet token
            userId: user._id,
            token: jwt.sign(
              // 3 argument
              {
                userId: user._id
              },
                `${process.env.JWT_KEY_TOKEN}`,
              // delai expiration du token
              { expiresIn: "12" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
