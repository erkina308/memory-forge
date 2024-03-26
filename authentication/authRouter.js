require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const db = require("../connection");

const authRouter = express.Router();

authRouter.use(express.json());

//Register
authRouter.post(
  "/register",
  [
    // Validate and sanitize user input
    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Username is required"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    try {
      // Check if the username or email is already taken
      const existingUser = await db.query(
        "SELECT * FROM users WHERE username = $1 OR email = $2",
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        return res
          .status(409)
          .json({ error: "Username or email already taken" });
      }

      // Hash the password and insert the new user into the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.query(
        "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
        [username, hashedPassword, email]
      );

      res.status(201).json({ user: newUser.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login
authRouter.post(
  "/login",
  [
    // Validate user input
    body("username")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Username is required"),
    body("password").isLength({ min: 1 }).withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if the user exists
    try {
      const userQuery = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      const user = userQuery.rows[0];

      if (!user) {
        return res.status(401).json({ error: "Invalid username" });
      }

      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Generate JWT token with user ID
      const token = jwt.sign({ userId: user.user_id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.user_id }); // Send user ID along with the token
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = authRouter;
