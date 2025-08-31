const cron = require("node-cron");
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      user: req.user._id,
      username: req.user.username,
      ...req.body,
    });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(400).json({ message: "Error creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }
    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  console.log(req);
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.status(204).json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};

// --------- Recurring task cron job ---------------

cron.schedule("0 0 * * *", async () => {
  const now = new Date();

  try {
    const recurringTasks = await Task.find({
      isRecurring: true,
      nextOccurrence: { $lte: now },
    });

    for (let task of recurringTasks) {
      try {
        // Avoid duplicate task for next occurrence
        const exists = await Task.findOne({
          user: task.user,
          title: task.title,
          startDate: task.nextOccurrence,
        });
        if (exists) continue;

        // Create a new task for next occurrence
        const newTask = new Task({
          user: task.user,
          username: task.username,
          title: task.title,
          description: task.description,
          category: task.category,
          priority: task.priority,
          status: "To Do",
          startDate: task.nextOccurrence,
          dueDate: task.nextOccurrence,
          isRecurring: true,
          recurrenceInterval: task.recurrenceInterval,
        });

        await newTask.save();

        // Calculate next occurrence date
        let next = new Date(task.nextOccurrence);
        if (task.recurrenceInterval === "daily")
          next.setDate(next.getDate() + 1);
        else if (task.recurrenceInterval === "weekly")
          next.setDate(next.getDate() + 7);
        else if (task.recurrenceInterval === "monthly")
          next.setMonth(next.getMonth() + 1);

        task.nextOccurrence = next;
        await task.save();
      } catch (innerErr) {
        console.error(`Error processing task ${task._id}:`, innerErr);
      }
    }

    console.log("Recurring tasks processed");
  } catch (err) {
    console.error("Error fetching recurring tasks:", err);
  }
});
