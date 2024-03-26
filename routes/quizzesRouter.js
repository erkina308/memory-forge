const express = require("express");
const router = express.Router();
const { validateQuizInput } = require("../authentication/validationMiddleware");
const {
  postQuiz,
  getQuizzes,
  getQuizById,
  patchQuizById,
  deleteQuizById,
} = require("../controllers/quizController");

//create quiz //'next' will be used when creating advanced error handling

router.post("/", validateQuizInput, postQuiz);

//get all quizzes

router.get("/", getQuizzes);

//get quiz by id

router.get("/:quiz_id", getQuizById);

//update a quiz by id

router.patch("/:quiz_id", validateQuizInput, patchQuizById);

//delete a quiz

router.delete("/:quiz_id", deleteQuizById);

module.exports = router;
