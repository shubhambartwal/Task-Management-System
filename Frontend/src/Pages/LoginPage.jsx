import React, { useState } from "react";
import { login } from "../api/authAPI";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      sessionStorage.setItem("token", response.data.token);
      setLoggedIn(true); // This triggers rerender in App
      navigate("/dashboard"); // Optionally, let parent reroute
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
          Login
        </h2>
        {error && (
          <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
        )}
        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
