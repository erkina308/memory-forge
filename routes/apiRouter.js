const express = require("express");
const flashcardsRouter = require("./flashcardsRouter");
const quizzesRouter = require("./quizzesRouter");
const studyPlansRouter = require("./studyPlansRouter");

const apiRouter = express.Router();

//routes, add them as you go along

apiRouter.use("/flashcards", flashcardsRouter);
apiRouter.use("/quizzes", quizzesRouter);
apiRouter.use("/study-plans", studyPlansRouter);

module.exports = apiRouter;
