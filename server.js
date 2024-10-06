const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // use your MySQL username
  password: '', // use your MySQL password
  database: 'simple_website'
});

// Connect to the database
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Create a database table for users
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE IF NOT EXISTS simple_website';
  db.query(sql, err => {
    if (err) throw err;
    res.send('Database created...');
  });
});

// Create users table
app.get('/createtable', (req, res) => {
  let sql = 'CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, err => {
    if (err) throw err;
    res.send('Users table created...');
  });
});

// Handle user registration
app.post('/register', (req, res) => {
  let user = { username: req.body.username, password: req.body.password };
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user, err => {
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
      res.send('Invalid username or password');
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
