const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const { OAuth2Client } = require("google-auth-library");
const config = require("../../config");
const { JWT_SECRET } = config;
// const { sendMail } = require("../../Utils/Email");
// const { setProfilePic } = require("../../Utils/ProfilePic");

router.post("/", (req, res) => {
  let hashedPassword = req.body.password
    ? bcrypt.hashSync(req.body.password, 8)
    : "";
  User.findOne({ email: req.body.email })
    .exec()
    .then((userM) => {
      if (userM) {
        console.log(userM);
        return res
          .status(500)
          .send({ message: "Email already exists", emailExists: true });
      } else {
        User.create(
          {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
          },
          (err, user) => {
            if (err) {
              console.log(err);
              return res.status(500).send({ message: "Registration failed" });
            } else {
              //   if (user.email)
              //     sendMail([user.email], {
              //       type: "ACCOUNT_REGISTERED",
              //       args: { name: req.body.name },
              //     });
              const token = jwt.sign(
                {
                  id: user._id,
                  role: user.role,
                  email: user.email,
                  status: true,
                },
                JWT_SECRET,
                { expiresIn: 1000 * 60 * 60 * 24 }
              );

              res
                .status(200)
                .send({ auth: true, token: token, userName: user.name });
            }
          }
        );
      }
    });
});

module.exports = router;
