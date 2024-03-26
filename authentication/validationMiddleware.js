const { body } = require("express-validator");

//input sanitisation for flashcards
exports.validateFlashcardInput = [
  body("question")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Question is required"),
  body("answer")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Answer is required"),
];

//input sanitisation for quizzes
exports.validateQuizInput = [
  body("question")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Question is required"),
  body("choices").isArray().withMessage("Choices must be an array"),
  body("choices.*")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Each choice must have at least 1 character"),
  body("correct_answer")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Correct answer required"),
];

//input sanitisation for study plans
exports.validateStudyPlanInput = [
  body("task")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Task required"),
  body("start_datetime").custom((value) => {
    // Check if startTime is in the format of 'YYYY-MM-DD HH:MM:SS'
    if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(value)) {
      throw new Error(
        "Invalid start time format. Expected format: YYYY-MM-DD HH:MM:SS"
      );
    }
    // If validation passes, return true
    return true;
  }),
  body("end_datetime").custom((value) => {
    if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(value)) {
      throw new Error(
        "Invalid end time format. Expected format: YYYY-MM-DD HH:MM:SS"
      );
    }
    return true;
  }),
];
