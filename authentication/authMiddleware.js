require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const authMiddleware = express.Router();

authMiddleware.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken; // Attach user information to the request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = authMiddleware;
