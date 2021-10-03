const express = require("express");
const router = express.Router();

const userRouter = require("./User");
const questionRouter = require("./Question");
const answerRouter = require("./Answer");
const authRouter = require("./auth");

router.get("/", (req, res) => {
  res.send("This API is reserved for quora clone");
});

router.use(authRouter);
router.use("/user", userRouter);
router.use("/questions", questionRouter);
router.use("/answers", answerRouter);

module.exports = router;
