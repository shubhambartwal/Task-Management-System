const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

// Get all tasks
router.get("/", protect, getTasks);

// Create a new task
router.post("/", protect, createTask);

// Update a task
router.put("/:id", protect, updateTask);

// Delete a task
router.delete("/:id", protect, deleteTask);

// Reminders route (uncomment to enable)
// router.get("/reminders", protect, getUpcomingReminders);

module.exports = router;
