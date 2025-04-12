// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const orderRoutes = require('./routes/order');

const app = express();

// ✅ MIDDLEWARE FIRST
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  credentials: true
}));

app.use(express.json()); // Parse incoming JSON data

// ✅ ROUTES AFTER MIDDLEWARE
app.use('/api', orderRoutes);
const authRoutes = require('./routes/auth'); // Import the auth routes
app.use('/api/auth', authRoutes); // Use auth route with /api/auth prefix
const servicesRoutes = require('./routes/services');
app.use('/api/services', servicesRoutes);

// Test DB Connection
db.query('SELECT 1', (err, result) => {
  if (err) console.log("❌ DB test failed:", err);
  else console.log("✅ DB test successful!");
});

// Example Users Endpoints (Optional)
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: 'User added successfully' });
  });
});

// Start Server
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
