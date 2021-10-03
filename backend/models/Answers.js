const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  createdAt: Date,
  answer: String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  userDetails: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Answers", AnswerSchema);
