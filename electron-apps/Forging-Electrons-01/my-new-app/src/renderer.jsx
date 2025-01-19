import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Box } from "@mui/material";
import { CssBaseline } from "@mui/material";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <CssBaseline />
    <App />
  </>
);
