import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById("root")
);
