const express = require('express');
const router = express.Router();
const db = require('../db');
const { authMiddleware } = require('../middleware/auth');

// Create task
router.post('/', authMiddleware, (req, res) => {
  const { title, description, due_date, status } = req.body;
  const user_id = req.user.id;
  const stmt = db.prepare('INSERT INTO tasks (user_id,title,description,due_date,status) VALUES (?,?,?,?,?)');
  stmt.run(user_id, title, description, due_date || null, status || 'Pending', function(err) {
    if (err) return res.status(500).json({ message: 'DB error' });
    db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => res.json(row));
  });
});

// Get tasks (if admin -> all, else own)
router.get('/', authMiddleware, (req, res) => {
  if (req.user.role === 'admin') {
    db.all('SELECT tasks.*, users.name AS owner_name FROM tasks LEFT JOIN users ON tasks.user_id = users.id ORDER BY tasks.created_at DESC', [], (err, rows) => {
      res.json(rows);
    });
  } else {
    db.all('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [req.user.id], (err, rows) => {
      res.json(rows);
    });
  }
});

// Update task (only owner or admin)
router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    db.run('UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?', 
      [title || task.title, description || task.description, due_date || task.due_date, status || task.status, id],
      function(err) {
        db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, updated) => res.json(updated));
      });
  });
});

// Delete task (only owner or admin)
router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (req.user.role !== 'admin' && task.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
      res.json({ message: 'Deleted' });
    });
  });
});

module.exports = router;
