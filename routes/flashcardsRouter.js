const express = require("express");
const router = express.Router();
const db = require("../connection");
const {
  postFlashcard,
  getFlashcards,
  getFlashcardById,
  patchFlashcardById,
} = require("../controllers/flashcardsController");
//create flashcard //'next' will be used when creating advanced error handling //user_id needs to change later on to be dynamic

router.post("/", postFlashcard);

//get all flashcards

router.get("/", getFlashcards);

//get flashcard by id

router.get("/:flashcard_id", getFlashcardById);

//update a flashcard by id //user_id needs to change later on to be dynamic

router.patch("/:flashcard_id", patchFlashcardById);

//delete a flashcard

router.delete("/:flashcard_id", async (req, res, next) => {
  try {
    const { flashcard_id } = req.params;
    const deleteFlashcardById = await db.query(
      `DELETE FROM flashcards WHERE flashcard_id = $1 RETURNING *;`,
      [flashcard_id]
    );
    res.json(deleteFlashcardById.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
