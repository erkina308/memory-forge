const express = require("express");
const router = express.Router();
const { getAllTopics } = require("../controllers/topicsController");

router.get("/", getAllTopics);

module.exports = router;
