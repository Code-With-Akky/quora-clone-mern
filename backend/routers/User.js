const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAuthenticated = require("../controller/requestAuthenticator");
// const { sendMail } = require("../Utils/Email");
// const { getFilePath } = require("../Utils/File");

router.get("/", async (req, res) => {
  // console.log(isAuthenticated);
  User.findOne({ _id: req.userId })
    .select({ _id: 0, __v: 0, password: 0 })
    .exec()
    .then(async (user) => {
      user = user.toObject();
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error in retreiving user" });
    });
});

router.get("/allUsers", async (req, res) => {
  // console.log(isAuthenticated);
  User.find({})
    .select({ _id: 0, __v: 0, password: 0 })
    .exec()
    .then(async (user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error in retreiving user" });
    });
});

module.exports = router;
