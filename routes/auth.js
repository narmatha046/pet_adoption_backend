// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Register new user
router.post("/register", (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  const sql = "INSERT INTO users (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, email, phone, password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      return res.status(500).json({ success: false, message: "Registration failed" });
    }
    res.json({ success: true, message: "User registered successfully" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (result.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

module.exports = router;
