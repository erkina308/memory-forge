const db = require("../connection");

//insert quiz into quizzes table

exports.insertQuiz = async (question, choices, correct_answer) => {
  try {
    // const { question, choices, correct_answer } = req.body; //this should be in the controller // this should also be updated to dynamically take the id
    const newQuiz = await db.query(
      `INSERT INTO quizzes (user_id, question, choices, correct_answer) VALUES (1, $1, $2, $3) RETURNING *;`,
      [question, choices, correct_answer]
    );

    return newQuiz.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

//select all quizzes from quizzes table

exports.selectQuizzes = async () => {
  try {
    const allQuizzes = await db.query(`SELECT * FROM quizzes;`);
    return allQuizzes.rows;
  } catch (err) {
    console.error(err.message);
  }
};

//select quiz by id from quiz table

exports.selectQuizById = async (quiz_id) => {
  try {
    const quizById = await db.query(
      `SELECT * FROM quizzes WHERE quiz_id = $1;`,
      [quiz_id]
    );
    return quizById.rows;
  } catch (err) {
    console.error(err.message);
  }
};

//update quiz by id in quizzes table

exports.updateQuizById = async (question, choices, correct_answer, quiz_id) => {
  try {
    const updatedQuiz = await db.query(
      `UPDATE quizzes SET question = $1, choices = $2, correct_answer = $3 WHERE quiz_id = $4 RETURNING *;`,
      [question, choices, correct_answer, quiz_id]
    );
    return updatedQuiz.rows;
  } catch (err) {
    console.error(err.message);
  }
};
