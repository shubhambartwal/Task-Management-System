import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/taskApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    toast.success("🗑️ Task removed successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
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
          <h4 className="text-xl font-semibold mb-4 text-gray-800 border-b border-indigo-300 pb-2">
            {category}
          </h4>
          <ul className="space-y-3">
            {categoryTasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center p-4 bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg shadow-sm transition"
              >
                <div>
                  <h5 className="text-lg font-semibold text-gray-900">
                    {task.title}
                  </h5>
                  <p className="text-sm text-gray-500">
                    Created by:{" "}
                    <span className="font-medium text-indigo-600">
                      {task.username}
                    </span>
                  </p>
                </div>

                {/* Middle Section - Status & Priority */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-md">
                    {task.status}
                  </span>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-md ${
                      priorityColors[task.priority] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                  >
                    Delete
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
