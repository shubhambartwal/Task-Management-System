import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  // React state for login status
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          path="/register"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <RegisterPage setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              <Dashboard setLoggedIn={setLoggedIn} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
