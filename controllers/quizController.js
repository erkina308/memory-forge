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
    const newQuiz = await insertQuiz(question, choices, correct_answer);
    res.status(201).json({ quiz: newQuiz });
  } catch (err) {
    console.error(err.message);
  }
};

// get all quizzes

exports.getQuizzes = async (req, res, next) => {
  try {
    const allQuizzes = await selectQuizzes();
    res.status(200).json({ quizzes: allQuizzes });
  } catch (err) {
    console.error(err.message);
  }
};

// get quiz by id

exports.getQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const selectedQuiz = await selectQuizById(quiz_id);
    res.status(200).json({ quiz: selectedQuiz });
  } catch (err) {
    console.error(err.message);
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
    console.error(err.message);
  }
};
