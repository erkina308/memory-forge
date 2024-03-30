const { selectAllTopics } = require("../models/topicsModel");

exports.getAllTopics = async (req, res, next) => {
  const allTopics = await selectAllTopics();
  res.status(200).json({ topics: allTopics });
};
