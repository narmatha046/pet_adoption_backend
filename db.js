const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Narmi@2004',       // your MySQL password
  database: 'reactdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL DB');
});

module.exports = db;