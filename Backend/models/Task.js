const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    startDate: { type: Date },
    dueDate: { type: Date },
    isRecurring: { type: Boolean, default: false },
    recurrenceInterval: {
      type: String,
      enum: ["", "daily", "weekly", "monthly"],
    },
    nextOccurrence: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
