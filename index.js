const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database!');

  // Create tasks table if it doesn't exist
  db.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Error creating table:', err);
    else console.log('Tasks table ready!');
  });
});

// GET /tasks — get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, count: results.length, tasks: results });
  });
});

// POST /tasks — create a task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

  db.query(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description || ''],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.status(201).json({ success: true, message: 'Task created', task: { id: result.insertId, title, description } });
    }
  );
});

// PATCH /tasks/:id — mark as completed
app.patch('/tasks/:id', (req, res) => {
  db.query(
    'UPDATE tasks SET completed = true WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Task not found' });
      res.json({ success: true, message: 'Task marked as completed' });
    }
  );
});

// DELETE /tasks/:id — delete a task
app.delete('/tasks/:id', (req, res) => {
  db.query(
    'DELETE FROM tasks WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Task not found' });
      res.json({ success: true, message: 'Task deleted' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});