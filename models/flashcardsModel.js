const db = require("../connection");

//insert flashcard into flashcards table

exports.insertFlashcard = async (question, answer) => {
  try {
    // const { question, answer } = req.body; //this should be in the controller // this should also be updated to dynamically take the id
    const newFlashcard = await db.query(
      `INSERT INTO flashcards (user_id, question, answer) VALUES (1, $1, $2) RETURNING *;`,
      [question, answer]
    );

    return newFlashcard.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

//select all flashcards from flashcards table

exports.selectFlashcards = async () => {
  try {
    const allFlashcards = await db.query(`SELECT * FROM flashcards;`);
    return allFlashcards.rows;
  } catch (err) {
    console.error(err.message);
  }
};

//select flashcard by id from flashcards table

exports.selectFlashcardById = async (flashcard_id) => {
  try {
    const flashcardById = await db.query(
      `SELECT * FROM flashcards WHERE flashcard_id = $1;`,
      [flashcard_id]
    );
    return flashcardById.rows;
  } catch (err) {
    console.error(err.message);
  }
};
