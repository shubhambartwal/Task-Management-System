import React, { useState, useEffect } from "react";
import { createTask } from "../api/taskApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceInterval, setRecurrenceInterval] = useState("daily");
  const token = sessionStorage.getItem("token");
  const categories = [
    "Work",
    "Personal",
    "Fitness",
    "Shopping",
    "Study",
    "Others",
  ];
  const submitHandler = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      category,
      priority,
      status,
      startDate,
      dueDate,
      isRecurring,
      recurrenceInterval,
      ...(isRecurring ? { nextOccurrence: dueDate || startDate } : {}),
    };
    try {
      await createTask(taskData, token);
      onTaskCreated();

      // ✅ Success toast
      toast.success("✅ Task created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // 🔁 Info toast if recurring
      if (isRecurring) {
        toast.info(`🔁 This task will repeat ${recurrenceInterval}`, {
          position: "top-right",
          autoClose: 4000,
        });
      }
      setTitle("");
      setCategory("");
      setPriority("Medium");
      setStatus("To Do");
      setStartDate("");
      setDueDate("");
      setIsRecurring(false);
      setRecurrenceInterval("daily");
    } catch (err) {
      console.error(err);

      // ❌ Error toast
      toast.error("❌ Failed to create task. Please try again.", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6 text-gray-700">
      <div>
        <label htmlFor="title" className="block mb-1 font-semibold">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
          className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
        />
      </div>

      <div>
        <label htmlFor="category" className="block mb-1 font-semibold">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <label htmlFor="priority" className="block mb-1 font-semibold">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="status" className="block mb-1 font-semibold">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <label htmlFor="startDate" className="block mb-1 font-semibold">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="dueDate" className="block mb-1 font-semibold">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="isRecurring"
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
        />
        <label htmlFor="isRecurring" className="font-semibold text-gray-700">
          Recurring Task
        </label>
      </div>

      {isRecurring && (
        <div>
          <label
            htmlFor="recurrenceInterval"
            className="block mb-1 font-semibold"
          >
            Recurrence Interval
          </label>
          <select
            id="recurrenceInterval"
            value={recurrenceInterval}
            onChange={(e) => setRecurrenceInterval(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
