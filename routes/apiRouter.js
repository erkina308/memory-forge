const express = require("express");
const flashcardsRouter = require("./flashcardsRouter");
const quizzesRouter = require("./quizzesRouter");

const apiRouter = express.Router();

//routes, add them as you go along

apiRouter.use("/flashcards", flashcardsRouter);
apiRouter.use("/quizzes", quizzesRouter);

module.exports = apiRouter;
