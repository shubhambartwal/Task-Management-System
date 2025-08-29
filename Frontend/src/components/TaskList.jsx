import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../api/taskApi";

const priorityColors = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const response = await getTasks(token);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Group tasks by category (default to 'Uncategorized')
  const tasksByCategory = tasks.reduce((acc, task) => {
    const cat = task.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(task);
    return acc;
  }, {});

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    fetchTasks();
  };

  const handleModify = async (id) => {
    // Edit logic here
    fetchTasks();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-700 text-center">
        Your Tasks
      </h3>

      {tasks.length === 0 && (
        <p className="py-4 text-center text-gray-500">No tasks found.</p>
      )}

      {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
        <div key={category} className="mb-8">
          <h4 className="text-xl font-semibold mb-3 text-gray-800 border-b border-indigo-300 pb-1">
            {category}
          </h4>
          <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
            {categoryTasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between py-3 px-4 hover:bg-indigo-50 rounded-md transition"
              >
                <div className="flex items-center gap-4">
                  <strong className="text-gray-900 font-medium">
                    {task.title}
                  </strong>
                  <span className="text-sm text-gray-600">
                    - {task.status} -
                  </span>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded ${
                      priorityColors[task.priority] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
                    aria-label={`Delete task ${task.title}`}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleModify(task._id)}
                    className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
                    aria-label={`Edit task ${task.title}`}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
