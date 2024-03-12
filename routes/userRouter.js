const express = require("express");
const flashcardsRouter = require("./flashcardsRouter");
const quizzesRouter = require("./quizzesRouter");
const studyPlansRouter = require("./studyPlansRouter");

const userRouter = express.Router();

//routes
userRouter.use("/flashcards", flashcardsRouter);
userRouter.use("/quizzes", quizzesRouter);
userRouter.use("/study-plans", studyPlansRouter);

module.exports = userRouter;
