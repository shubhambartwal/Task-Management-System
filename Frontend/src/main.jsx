import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import setupLocatorUI from "@locator/runtime";
setupLocatorUI();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
