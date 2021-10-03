const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const questionDB = require("../models/Questions");
const isAuthenticated = require("../controller/requestAuthenticator");
const Answers = require("../models/Answers");

router.post("/", async (req, res) => {
  console.log(req.body.userDetails);
  console.log(typeof req.body.userDetails);
  try {
    await questionDB
      .create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        userId: req.body.userId,
      })
      .then(() => {
        res.status(201).send({
          message: "Question added successfully",
          status: true,
        });
      })
      .catch((err) => {
        res.status(400).send({
          message: "Bad format",
          status: false,
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error while adding question",
    });
  }
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  // questionDB
  //   .aggregate([
  //     {
  //       $lookup: {
  //         from: "answers",
  //         let: { questionId: "$_id" },
  //         pipeline: [
  //           {
  //             $match: {
  //               expr: {
  //                 $eq: ["$questionId", "$$questionId"],
  //               },
  //             },
  //           },
  //           {
  //             $project: {
  //               _id: 1,
  //               answer: 1,
  //               userDetails: 1,
  //               createdAt: 1,
  //             },
  //           },
  //         ],
  //         as: "answers",
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: "$answers",
  //         preserveNullAndEmptyArrays: true,
  //       },
  //     },
  //     {
  //       $project: {
  //         __v: 0
  //         // _id: 1,
  //         // questionName: 1,
  //         // questionUrl: 1,
  //         // userDetails: 1,
  //         // createdAt: 1,
  //         // allAnswers: 1,
  //         // answers: 1,
  //       },
  //     },
  //   ])
  // questionDB.find({}).populate('answers').exec().then((doc) => {
  //         res.status(200).send(doc);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).send(error);
  //   });
  questionDB.aggregate([
    {
      $lookup: {
          from: "answers", // collection to join
          localField: "_id",//field from the input documents
          foreignField: "questionId",//field from the documents of the "from" collection
          as: "allAnswers"// output array field
      }
  },
  {
    $lookup: {
        from: "users", // collection to join
        localField: "userId",//field from the input documents
        foreignField: "_id",//field from the documents of the "from" collection
        as: "userDetails"// output array field
    }
}
  ]).exec().then((doc) => {
    res.status(200).send(doc)
  })
});


router.get("/:id", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  questionDB.aggregate([
    {
      $match: {userId: mongoose.Types.ObjectId(req.params.id) }
    },
    {
      $lookup: {
          from: "answers", // collection to join
          localField: "_id",//field from the input documents
          foreignField: "questionId",//field from the documents of the "from" collection
          as: "allAnswers"// output array field
      }
  },
  {
    $lookup: {
        from: "users", // collection to join
        localField: "userId",//field from the input documents
        foreignField: "_id",//field from the documents of the "from" collection
        as: "userDetails"// output array field
    }
},
  ]).exec().then((doc) => {
    res.status(200).send(doc)
  })
});


module.exports = router;
