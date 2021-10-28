import React from "react";
// import Login from './components/SignIn/Login';
import Register from "./components/SignIn/signup";
import Home from "../src/Pages/Home/Home.jsx";
import Login from "./components/SignIn/Login";
import Post from "../src/Pages/Post/Post.jsx";
import Profilepage from "./Pages/Profile/profile"
import UpdateProfilepage from "./Pages/updateprofile/updateprofile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Signin" component={Login} />
        <Route exact path="/Signup" component={Register} />
        <Route exact path="/Post" component={Post} />
        <Route exact path="/Profile" component={Profilepage}/>
        <Route exact path="/updateProfile" component={UpdateProfilepage}/>
      </Switch>
    </Router>
  );
}

export default App;
