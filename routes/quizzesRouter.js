const express = require("express");
const router = express.Router();
const {
  postQuiz,
  getQuizzes,
  getQuizById,
  patchQuizById,
  deleteQuizById,
} = require("../controllers/quizController");

//create quiz //'next' will be used when creating advanced error handling //user_id needs to change later on to be dynamic

router.post("/", postQuiz);

//get all quizzes

router.get("/", getQuizzes);

// //get quiz by id

// router.get("/:flashcard_id", getQuizById);

// //update a quiz by id //user_id needs to change later on to be dynamic

// router.patch("/:flashcard_id", patchQuizById);

// //delete a quiz

// router.delete("/:flashcard_id", deleteQuizById);

module.exports = router;
