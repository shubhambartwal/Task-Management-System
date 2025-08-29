import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const onTaskCreated = () => setRefresh(!refresh);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove auth token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-50 flex flex-col items-center p-8">
      <header className="w-full max-w-3xl flex justify-between items-center mb-10">
        <h2 className="text-4xl font-extrabold text-indigo-700 drop-shadow">
          Task Manager
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </header>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 mb-10">
        <TaskForm onTaskCreated={onTaskCreated} />
      </div>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <TaskList key={refresh} />
      </div>
    </div>
  );
};

export default Dashboard;
