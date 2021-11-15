import React,{useContext} from "react";
import Register from "./components/SignIn/signup";
import Home from "../src/Pages/Home/Home.jsx";
import Login from "./components/SignIn/Login";
import Post from "../src/Pages/Post/Post.jsx";
import WhatsNew from "../src/Pages/WhatsNew/WhatsNew";
import Profilepage from "./Pages/Profile/profile"
import UpdateProfilepage from "./Pages/updateprofile/updateprofile";
import Upload from "./Pages/upload/Upload";
import Dashboardpage from "./Pages/adminDashboard/AdminDashboard";
// import EditUserPost from "./components/dashboard/EditUserPost";
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom";
import { AuthContext } from "./Context/Authcontext";

function App() {
  const { user, isAdmin } = useContext(AuthContext);
  return (
    
    <Router>
      <Switch>
        <Route exact path="/" >{!isAdmin?<Home />:<Dashboardpage/> }</Route>
        <Route exact path="/Signin"  >{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route exact path="/Signup" >{user ? <Redirect to="/" /> : <Register />}</Route>
        <Route exact path="/Post/:id" component={Post} />
        <Route exact path="/WhatsNew" component={WhatsNew} />
        <Route exact path="/Profile/:username" component={Profilepage}/>
        <Route exact path="/updateProfile" component={UpdateProfilepage}/>
        <Route exact path="/upload"  >{user ? <Upload /> : <Redirect to="/Signin" />}</Route>
        <Route exact path="/dashboard" >{isAdmin ? <Dashboardpage /> : <Redirect to="/Signin" />}</Route>
      </Switch>
      
    </Router>
  );
}

export default App;
