const express = require("express");
const flashcardsRouter = require("./flashcardsRouter");

const apiRouter = express.Router();

//routes, add them as you go along

apiRouter.use("/flashcards", flashcardsRouter);

module.exports = apiRouter;
