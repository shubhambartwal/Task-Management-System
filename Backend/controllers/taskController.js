const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      user: req.user._id,
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
    console.log("hiiii", req);
    const tasks = await Task.find({ user: req.user._id });
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
// exports.getUpcomingReminders = async (req, res) => {
//   try {
//     const now = new Date();
//     const upcomingTasks = await Task.find({
//       user: req.user.id,
//       dueDate: { $gte: now },
//       status: { $ne: "Done" },
//     }).sort({ dueDate: 1 });
//     res.json(upcomingTasks);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching reminders" });
//   }
// };
