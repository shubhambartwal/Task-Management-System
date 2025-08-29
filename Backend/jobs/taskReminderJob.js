const Agenda = require("agenda");
const Task = require("../models/Task");

const mongoConnectionString = process.env.MONGO_URI;

const agenda = new Agenda({
  db: { address: mongoConnectionString, collection: "agendaJobs" },
});

// Define the job for sending reminders or processing recurring tasks
agenda.define("send task reminder", async (job) => {
  const { taskId } = job.attrs.data;
  const task = await Task.findById(taskId);
  if (!task) return;

  // Implement your reminder logic here, e.g., send email or notification
  console.log(`Reminder: Task "${task.title}" is due on ${task.dueDate}`);
});

// Schedule reminders for tasks with a due date and recurring tasks
const scheduleTaskReminders = async () => {
  const tasks = await Task.find({ isRecurring: true });
  for (const task of tasks) {
    // Example: schedule job for each recurring interval
    await agenda.every(task.recurrenceInterval, "send task reminder", {
      taskId: task._id,
    });
  }
};

const startAgenda = async () => {
  await agenda.start();
  await scheduleTaskReminders();
};

module.exports = {
  agenda,
  startAgenda,
};
