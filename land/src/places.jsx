import React from "react";
import { createRoot } from "react-dom/client";
import { TravelPage } from "./PersonalSite.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="personal-site">
      <main className="personal-container">
        <TravelPage standalone />
      </main>
    </div>
  </React.StrictMode>,
);
