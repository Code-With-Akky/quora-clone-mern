const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { JWT_SECRET } = config;
// const { sendMail } = require("../../Utils/Email");
const loginRouter = require("./Login");
const registerRouter = require("./Register");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use("/register", registerRouter);
router.use("/login", loginRouter);

router.post("/validateToken", (req, res) => {
  jwt.verify(req.headers["authorization"], JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "Reset Link has been expired" });
    } else {
      const userId = decoded.id;
      const role = decoded.role;
      const email = decoded.email;
      const token = jwt.sign(
        { id: userId, role: role, email: email },
        JWT_SECRET,
        { expiresIn: 1000 * 60 * 60 * 24 }
      );
      res.status(200).send({ auth: true, token: token });
    }
  });
});

router.get("/validateTokenExpiry", (req, res) => {
  jwt.verify(req.headers["authorization"], JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "Link has been expired" });
    } else {
      res.status(200).send({ message: "Token is valid" });
    }
  });
});

// router.post("/forgotPassword", async (req, res) => {
//   User.findOne({ email: req.body.email })
//     .exec()
//     .then((user) => {
//       if (user) {
//         const token = jwt.sign(
//           { id: user._id, role: user.role, email: user.email },
//           JWT_SECRET,
//           { expiresIn: 300 }
//         );
//         sendMail([user.email], {
//           type: "RESET_PASSWORD",
//           args: { link: `${HOST}/resetPassword?account=${token}` },
//         });
//         res.status(200).send({
//           message: "Reset password link is sent to the registered email",
//         });
//       } else {
//         res.status(404).send({ message: "User not found" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send("Error in sending reset password link");
//     });
// });

module.exports = router;
