const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const { OAuth2Client } = require("google-auth-library");
const config = require("../../config");
const { JWT_SECRET } = config;
const axios = require("axios");

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Internal server error" });
    } else {
      if (!user) return res.status(404).send({ user: false });

      const password = req.body.password ? req.body.password : "";
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });

      const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email, status: true },
        JWT_SECRET,
        { expiresIn: 1000 * 60 * 60 * 24 }
      );

      res.status(200).send({
        auth: true,
        token: token,
        userName: user.name,
        userEmail: user.email,
        role: user.role,
        userId: user._id,
      });
    }
  });
});

module.exports = router;
