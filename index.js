const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(express.json());

// Helper: read tasks from file
function readTasks() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Helper: write tasks to file
function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// GET /tasks — return all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json({ success: true, count: tasks.length, tasks });
});

// POST /tasks — add a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }

  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({ success: true, message: 'Task created', task: newTask });
});

// PATCH /tasks/:id — mark task as completed
app.patch('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }

  task.completed = true;
  writeTasks(tasks);

  res.json({ success: true, message: 'Task marked as completed', task });
});

// DELETE /tasks/:id — delete a task
app.delete('/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }

  const deleted = tasks.splice(index, 1)[0];
  writeTasks(tasks);

  res.json({ success: true, message: 'Task deleted', task: deleted });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
