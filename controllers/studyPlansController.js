const {
  insertStudyPlan,
  selectStudyPlans,
  selectStudyPlanById,
  updateStudyPlanById,
  removeStudyPlanById,
} = require("../models/studyPlansModel");

// post new study plan

exports.postStudyPlan = async (req, res, next) => {
  //need to use next for the error at some point
  try {
    const { task, start_datetime, end_datetime } = req.body;
    const newStudyPlan = await insertStudyPlan(
      task,
      start_datetime,
      end_datetime
    );
    res.status(201).json({ study_plan: newStudyPlan });
  } catch (err) {
    console.error(err.message);
  }
};

// get all study plans

exports.getStudyPlans = async (req, res, next) => {
  try {
    const allStudyPlans = await selectStudyPlans();
    res.status(200).json({ study_plans: allStudyPlans });
  } catch (err) {
    console.error(err.message);
  }
};

// get study plan by id

exports.getStudyPlanById = async (req, res, next) => {
  try {
    const { study_plan_id } = req.params;
    const selectedStudyPlan = await selectStudyPlanById(study_plan_id);
    res.status(200).json({ study_plan: selectedStudyPlan });
  } catch (err) {
    console.error(err.message);
  }
};
