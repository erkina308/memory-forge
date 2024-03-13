const {
  insertFlashcard,
  selectFlashcards,
  selectFlashcardById,
  updateFlashcardById,
  removeFlashcardById,
} = require("../models/flashcardsModel");

// post new flashcard

exports.postFlashcard = async (req, res, next) => {
  //need to use next for the error at some point
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ msg: "Missing required fields" });
    }
    const userId = req.user.userId;
    const newFlashcard = await insertFlashcard(userId, question, answer);
    res.status(201).json({ flashcard: newFlashcard });
  } catch (err) {
    console.error(err.message);
  }
};

// get all flashcards

exports.getFlashcards = async (req, res, next) => {
  const userId = req.user.userId;
  const allFlashcards = await selectFlashcards(userId);
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
