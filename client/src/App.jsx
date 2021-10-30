import React from "react";

import Register from "./components/SignIn/signup";
import Home from "../src/Pages/Home/Home.jsx";
import Login from "./components/SignIn/Login";
import Post from "../src/Pages/Post/Post.jsx";
import WhatsNew from "../src/components/WhatsNew/WhatsNew.jsx";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Signin" component={Login} />
        <Route exact path="/Signup" component={Register} />
        <Route exact path="/Post" component={Post} />
        <Route exact path="/WhatsNew" component={WhatsNew} />
      </Switch>
      
    </Router>
  );
}

export default App;
