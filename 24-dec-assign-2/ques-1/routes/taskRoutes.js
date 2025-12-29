const express = require("express");
const Task = require("../models/Task");

const router = express.Router();


// CREATE TASK
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// READ ALL TASKS / FILTER
router.get("/", async (req, res) => {
  try {
    const { status, dueDate } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (dueDate) filter.dueDate = dueDate;

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// UPDATE TASK
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
