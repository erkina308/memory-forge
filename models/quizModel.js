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
  const allQuizzes = await db.query(`SELECT * FROM quizzes;`);
  return allQuizzes.rows;
};

//select quiz by id from quiz table

exports.selectQuizById = async (quiz_id) => {
  const quizById = await db.query(`SELECT * FROM quizzes WHERE quiz_id = $1;`, [
    quiz_id,
  ]);
  if (quizById.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Quiz does not exist" });
  }
  return quizById.rows;
};

//update quiz by id in quizzes table

exports.updateQuizById = async (question, choices, correct_answer, quiz_id) => {
  const updatedQuiz = await db.query(
    `UPDATE quizzes SET question = $1, choices = $2, correct_answer = $3 WHERE quiz_id = $4 RETURNING *;`,
    [question, choices, correct_answer, quiz_id]
  );
  if (updatedQuiz.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Quiz does not exist" });
  }
  return updatedQuiz.rows;
};

//delete quiz by id from quizzes table

exports.removeQuizById = async (quiz_id) => {
  const quizToDelete = await db.query(
    `DELETE FROM quizzes WHERE quiz_id = $1 RETURNING *;`,
    [quiz_id]
  );
  if (quizToDelete.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Quiz does not exist" });
  }
  return quizToDelete.rows;
};
