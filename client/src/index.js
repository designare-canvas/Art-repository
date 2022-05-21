import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import TimeAgo from "javascript-time-ago";
import { AuthContextProvider } from "./Context/Authcontext";
import App from "./App";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

ReactDOM.render(
  <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById("root")
);