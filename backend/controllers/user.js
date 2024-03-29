const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const cryptojs = require("crypto-js");



exports.signup = (req, res, next) => {
    // crypto-js pour crypter notre mail
    const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_KEY_FOR_EMAIL}`)
    .toString();

    console.log("password",req.body)
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: emailCryptoJs,  // On remplace notre mail d'origine par la version cryptée
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  
  exports.login = (req, res, next) => {
    // Pour réccupérer notre mail crypté

    const emailCryptoJs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOJS_KEY_FOR_EMAIL}`)
    .toString();

    User.findOne({ email: emailCryptoJs })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.AUTH_TOKEN_JWT}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };