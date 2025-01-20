import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline />
    <App />
  </>
);
