const {
  insertQuiz,
  selectQuizzes,
  selectQuizById,
  updateQuizById,
  removeQuizById,
} = require("../models/quizModel");

// post new quiz

exports.postQuiz = async (req, res, next) => {
  //need to use next for the error at some point
  try {
    const { question, choices, correct_answer } = req.body;
    if (!question || !choices || !correct_answer) {
      return res.status(400).json({ msg: "Missing required fields" });
    }
    const userId = req.user.userId;
    const newQuiz = await insertQuiz(userId, question, choices, correct_answer);
    res.status(201).json({ quiz: newQuiz });
  } catch (err) {
    console.error(err.message);
  }
};

// get all quizzes

exports.getQuizzes = async (req, res, next) => {
  const userId = req.user.userId;
  const { sort_by, order } = req.query;
  const allQuizzes = await selectQuizzes(userId, sort_by, order);
  res.status(200).json({ quizzes: allQuizzes });
};

// get quiz by id

exports.getQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const selectedQuiz = await selectQuizById(quiz_id);
    res.status(200).json({ quiz: selectedQuiz });
  } catch (err) {
    next(err);
  }
};

// patch quiz by id

exports.patchQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const { question, choices, correct_answer } = req.body;
    const updatedQuiz = await updateQuizById(
      question,
      choices,
      correct_answer,
      quiz_id
    );
    res.status(200).json({ quiz: updatedQuiz });
  } catch (err) {
    next(err);
  }
};

// delete quiz by id // check again if this needs to return a body

exports.deleteQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const quizToDelete = await removeQuizById(quiz_id);
    res.status(204).json(quizToDelete);
  } catch (err) {
    next(err);
  }
};
