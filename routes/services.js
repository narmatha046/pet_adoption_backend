// backend/routes/services.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/services/book - Save service booking details into the database
router.post("/book", (req, res) => {
  const { breedName, age, gender, petType, date, time, venue } = req.body;
  const sql = `INSERT INTO bookings (breedName, age, gender, petType, date, time, venue) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [breedName, age, gender, petType, date, time, venue], (err, result) => {
    if (err) {
      console.error("Error storing booking:", err);
      return res.status(500).json({ success: false, message: "Booking failed" });
    }
    res.json({ success: true, message: "Booking stored successfully" });
  });
});

module.exports = router;
