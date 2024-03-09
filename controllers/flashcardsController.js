const { insertFlashcard } = require("../models/flashcardsModel");

exports.postFlashcard = async (req, res, next) => {
  //need to use next for the error at some point
  try {
    const { question, answer } = req.body;
    const newFlashcard = await insertFlashcard(question, answer);
    res.status(201).json(newFlashcard);
  } catch (err) {
    console.error(err.message, "<-- in controller");
  }
};
