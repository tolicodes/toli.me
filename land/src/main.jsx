import "./analytics.js";
import React from "react";
import { createRoot } from "react-dom/client";
import { PersonalSite as App } from "./PersonalSite.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
