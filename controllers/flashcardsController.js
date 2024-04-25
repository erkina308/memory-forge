const { validationResult } = require("express-validator");
const {
  insertFlashcard,
  selectFlashcards,
  selectFlashcardById,
  updateFlashcardById,
  removeFlashcardById,
  findFlashcard,
} = require("../models/flashcardsModel");

// post new flashcard

exports.postFlashcard = async (req, res, next) => {
  //need to use next for the error at some point
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, answer, topic } = req.body;
    if (!question || !answer || !topic) {
      return res.status(400).json({ msg: "Missing required fields" });
    }
    const userId = req.user.userId;
    const newFlashcard = await insertFlashcard(userId, question, answer, topic);
    res.status(201).json({ flashcard: newFlashcard });
  } catch (err) {
    console.error(err.message);
  }
};

// get all flashcards

exports.getFlashcards = async (req, res, next) => {
  const userId = req.user.userId;
  const { sort_by, order, topic } = req.query;
  const allFlashcards = await selectFlashcards(userId, sort_by, order, topic);
  res.status(200).json({ flashcards: allFlashcards });
};

// get flashcard by id

exports.getFlashcardById = async (req, res, next) => {
  try {
    const { flashcard_id } = req.params;
    const selectedFlashcard = await selectFlashcardById(flashcard_id);
    res.status(200).json({ flashcard: selectedFlashcard });
  } catch (err) {
    next(err);
  }
};

// patch flashcard by id

exports.patchFlashcardById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { flashcard_id } = req.params;
    const { question, answer } = req.body;
    const updatedFlashcard = await updateFlashcardById(
      question,
      answer,
      flashcard_id
    );
    res.status(200).json({ flashcard: updatedFlashcard });
  } catch (err) {
    next(err);
  }
};

// delete flashcard by id // check again if this needs to return a body

exports.deleteFlashcardById = async (req, res, next) => {
  try {
    const { flashcard_id } = req.params;
    const flashcardToDelete = await removeFlashcardById(flashcard_id);
    res.status(204).json(flashcardToDelete);
  } catch (err) {
    next(err);
  }
};

// search for a flashcard

exports.searchFlashcard = async (req, res, next) => {
  console.log(req.query, "<--- in backend");
  const { query } = req.query;
  console.log(query, "<---");
  try {
    const searchedFlashcards = await findFlashcard(query);
    res.status(200).json({ flashcards: searchedFlashcards });
  } catch (err) {
    next(err);
  }
};
