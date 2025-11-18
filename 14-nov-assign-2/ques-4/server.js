const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const filePath = path.join(__dirname, "tasks.json");

// Utility: Read tasks
function readTasks() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Utility: Write tasks
function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

//  GET all tasks
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

//  GET tasks by tag
app.get("/tasks/filter", (req, res) => {
  const { tag } = req.query;
  const tasks = readTasks();
  const filtered = tasks.filter((t) => t.tag.toLowerCase() === tag.toLowerCase());

  if (filtered.length > 0) {
    res.json(filtered);
  } else {
    res.status(404).json({ message: "No tasks found with this tag" });
  }
});

//  POST add new task
app.post("/tasks", (req, res) => {
  const { title, description, tag, priority, status } = req.body;

  if (!title || !description || !tag || !priority || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    tag,
    priority,
    status,
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

//  PUT update a task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, tag, priority, status } = req.body;

  let tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    tag: tag || tasks[taskIndex].tag,
    priority: priority || tasks[taskIndex].priority,
    status: status || tasks[taskIndex].status,
  };

  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

//  DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  const newTasks = tasks.filter((t) => t.id !== parseInt(id));

  if (tasks.length === newTasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }

  writeTasks(newTasks);
  res.json({ message: "Task deleted successfully" });
});

//  Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});