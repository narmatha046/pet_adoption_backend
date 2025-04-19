const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'yamanote.proxy.rlwy.net',
  user: 'root',
  password: 'PgFhpnBHxYnDWMbwzOZpqJjsqJbtWBxS',
  database: 'railway',
  port: 45850
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to Railway MySQL');
});

module.exports = db;
