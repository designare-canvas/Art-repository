import React,{useContext} from "react";

import Register from "./components/SignIn/signup";
import Home from "../src/Pages/Home/Home.jsx";
import Login from "./components/SignIn/Login";
import Post from "../src/Pages/Post/Post.jsx";
import WhatsNew from "../src/components/WhatsNew/WhatsNew.jsx";
import Profilepage from "./Pages/Profile/profile"
import UpdateProfilepage from "./Pages/updateprofile/updateprofile";
import Upload from "./Pages/upload/Upload";
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom";
import { AuthContext } from "./Context/Authcontext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Signin"  >{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route exact path="/Signup" >{user ? <Redirect to="/" /> : <Register />}</Route>
        <Route exact path="/Post" component={Post} />
        <Route exact path="/WhatsNew" component={WhatsNew} />
        <Route exact path="/Profile" component={Profilepage}/>
        <Route exact path="/updateProfile" component={UpdateProfilepage}/>
        <Route exact path="/upload"  >{user ? <Upload /> : <Redirect to="/Login" />}</Route>
      </Switch>
      
    </Router>
  );
}

export default App;
