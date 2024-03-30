const db = require("../connection");

//insert study plan into study plans table

exports.insertStudyPlan = async (
  user_id,
  task,
  start_datetime,
  end_datetime
) => {
  try {
    const newStudyPlan = await db.query(
      `INSERT INTO study_plans (user_id, task, start_datetime, end_datetime) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [user_id, task, start_datetime, end_datetime]
    );

    return newStudyPlan.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

//select all study plans from study plans table //create a sortby for this later on

exports.selectStudyPlans = async (user_id) => {
  const allStudyPlans = await db.query(
    `SELECT * FROM study_plans WHERE user_id = $1;`,
    [user_id]
  );
  return allStudyPlans.rows;
};

//select study plan by id from study plans table

exports.selectStudyPlanById = async (study_plan_id) => {
  const studyPlanById = await db.query(
    `SELECT * FROM study_plans WHERE study_plan_id = $1;`,
    [study_plan_id]
  );
  if (studyPlanById.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Study plan does not exist" });
  }
  return studyPlanById.rows;
};

//update study plan by id in study plans table

exports.updateStudyPlanById = async (
  task,
  start_datetime,
  end_datetime,
  study_plan_id
) => {
  const updatedStudyPlan = await db.query(
    `UPDATE study_plans SET task = $1, start_datetime = $2, end_datetime = $3 WHERE study_plan_id = $4 RETURNING *;`,
    [task, start_datetime, end_datetime, study_plan_id]
  );
  if (updatedStudyPlan.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Study plan does not exist" });
  }
  return updatedStudyPlan.rows;
};

//delete study plan by id from study plans table

exports.removeStudyPlanById = async (study_plan_id) => {
  const studyPlanToDelete = await db.query(
    `DELETE FROM study_plans WHERE study_plan_id = $1 RETURNING *;`,
    [study_plan_id]
  );
  if (studyPlanToDelete.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Study plan does not exist" });
  }
  return studyPlanToDelete.rows;
};
