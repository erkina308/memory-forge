const db = require("../connection");

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

exports.selectFlashcards = async () => {
  try {
    const allFlashcards = await db.query(`SELECT * FROM flashcards;`);
    return allFlashcards.rows;
  } catch (err) {
    console.error(err.message, "<-- in model");
  }
};
