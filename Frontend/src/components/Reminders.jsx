import React, { useEffect, useState } from "react";
import axios from "axios";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/tasks/reminders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReminders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReminders();
    // Optionally, refresh reminders every few minutes:
    const interval = setInterval(fetchReminders, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token]);

  if (reminders.length === 0) {
    return <div>No upcoming reminders.</div>;
  }

  return (
    <div>
      <h3>Upcoming Reminders</h3>
      <ul>
        {reminders.map((task) => (
          <li key={task._id}>
            {task.title} - Due: {new Date(task.dueDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
