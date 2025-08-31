const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Get all tasks
router.get("/", protect, getTasks);

// Create a new task
router.post("/", protect, createTask);

// Delete a task
router.delete("/:id", protect, deleteTask);

module.exports = router;
