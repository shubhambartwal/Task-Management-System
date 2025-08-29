const app = require("./app");
const { startAgenda } = require("./jobs/taskReminderJob");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startAgenda().catch(console.error);
});
