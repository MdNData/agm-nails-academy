import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import { AppContext } from "./context.jsx";

createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <AppContext>
      <App />
    </AppContext>
  </React.Fragment>
);
