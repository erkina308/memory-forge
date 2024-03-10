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
