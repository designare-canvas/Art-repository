import React from "react";
// import Login from './components/SignIn/Login';
import Register from "./components/SignIn/signup";
import Home from "../src/Pages/Home/Home.jsx";
import Login from "./components/SignIn/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Signin" component={Login} />
        <Route exact path="/Signup" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
