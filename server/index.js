const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); 
const app = express();
const port = 5000;

app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'padhakku_assignment',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ' + error);
      res.status(500).json({ error: 'Database query error' });
    } else {
      console.log('Query results:', results);
      res.json({ data: results });
    }
  });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
