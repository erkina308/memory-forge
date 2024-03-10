const express = require("express");
const router = express.Router();
const {
  postStudyPlan,
  getStudyPlans,
  getStudyPlanById,
  patchStudyPlanById,
  deleteStudyPlanById,
} = require("../controllers/studyPlansController");

//create study plan //'next' will be used when creating advanced error handling //user_id needs to change later on to be dynamic

router.post("/", postStudyPlan);

//get all study plans

router.get("/", getStudyPlans);

//get study plan by id

router.get("/:study_plan_id", getStudyPlanById);

//update a study plan by id //user_id needs to change later on to be dynamic

router.patch("/:study_plan_id", patchStudyPlanById);

// //delete a study plan

// router.delete("/:study_plan_id", deleteStudyPlanById);

module.exports = router;
