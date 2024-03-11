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
  const allFlashcards = await db.query(`SELECT * FROM flashcards;`);
  return allFlashcards.rows;
};

//select flashcard by id from flashcards table

exports.selectFlashcardById = async (flashcard_id) => {
  const flashcardById = await db.query(
    `SELECT * FROM flashcards WHERE flashcard_id = $1;`,
    [flashcard_id]
  );
  if (flashcardById.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Flashcard does not exist" });
  }
  return flashcardById.rows;
};

//update flashcard by id in flashcards table

exports.updateFlashcardById = async (question, answer, flashcard_id) => {
  try {
    const updatedFlashcard = await db.query(
      `UPDATE flashcards SET question = $1, answer = $2 WHERE flashcard_id = $3 RETURNING *;`,
      [question, answer, flashcard_id]
    );
    return updatedFlashcard.rows;
  } catch (err) {
    console.error(err.message);
  }
};

//delete flashcard by id from flashcards table

exports.removeFlashcardById = async (flashcard_id) => {
  try {
    const flashcardToDelete = await db.query(
      `DELETE FROM flashcards WHERE flashcard_id = $1 RETURNING *;`,
      [flashcard_id]
    );
    return flashcardToDelete.rows;
  } catch (err) {
    console.error(err.message);
  }
};
