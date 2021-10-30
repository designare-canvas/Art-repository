import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import TimeAgo from "javascript-time-ago";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StyledEngineProvider>,
  document.getElementById("root")
);
