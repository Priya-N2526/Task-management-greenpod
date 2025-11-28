const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  const hashed = await bcrypt.hash(password, 10);
  const stmt = db.prepare('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)');
  stmt.run(name, email, hashed, role || 'user', function(err) {
    if (err) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const user = { id: this.lastID, name, email, role: role || 'user' };
    const token = jwt.sign(user, SECRET, { expiresIn: '6h' });
    res.json({ token, user });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
    const token = jwt.sign(payload, SECRET, { expiresIn: '6h' });
    res.json({ token, user: payload });
  });
});

module.exports = router;
