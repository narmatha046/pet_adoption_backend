// backend/routes/order.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Save order to MySQL
router.post('/place-order', (req, res) => {
  const { name, phone, address, items, totalPrice, deliveryDate } = req.body;

  console.log("Received order data:", req.body); // Good for debugging

  const sql = `
    INSERT INTO orders (name, phone, address, items, total_price, delivery_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, address, JSON.stringify(items), totalPrice, deliveryDate], (err, result) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ message: 'Order stored successfully' });
  });
});

module.exports = router;
