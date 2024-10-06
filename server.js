const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MySQL Database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',    // MySQL username
  password: '',    // MySQL password
  database: 'simple_website'
});

// Establish the MySQL connection
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Route for home
app.get('/', (req, res) => {
  res.send('Welcome to Simple Website!');
});

// Handle user registration
app.post('/register', (req, res) => {
  let user = { username: req.body.username, password: req.body.password };
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send('User registered...');
  });
});

// Handle user login
app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send('Login successful!');
    } else {
      res.send('Invalid credentials');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
