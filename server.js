const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = './memek.json';

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  const user = db.users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, isAdmin: user.isAdmin });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Create user (admin only)
app.post('/api/create-user', (req, res) => {
  const { adminUser, adminPass, newUser, newPass } = req.body;
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  const admin = db.users.find(u => u.username === adminUser && u.pas
