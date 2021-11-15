import "./profile.scss";
import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ImageListShow from "./profilepostlistshow";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { AuthContext } from "../../Context/Authcontext";
import { useParams } from 'react-router-dom';
import { getThemeProps } from "@material-ui/styles";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const [value, setValue] = React.useState("one");
  const [userData, setUserData] = useState(null);
  const [likedPosts,setLikedPosts] = useState([]);

  const { username } = useParams();

  const handleChange = (event, newValue) => {
    var element1 = document.getElementById("one");
    var element2 = document.getElementById("two");
    var element3 = document.getElementById("three");
    if (!element1.classList.contains("mystyle")) {
      element1.classList.toggle("mystyle");
    }
    if (!element2.classList.contains("mystyle")) {
      element2.classList.toggle("mystyle");
    }
    if (!element3.classList.contains("mystyle")) {
      element3.classList.toggle("mystyle");
    }
    var element = document.getElementById(newValue);
    element.classList.toggle("mystyle");
    setValue(newValue);
  };

  const fetchData = async() => {
    const result = await axios.get("http://localhost:8080/api/posts/user/"+username, {
      params: user,
      withCredentials: true,
    });
    console.log(result);

    if (result.data.success) {
      setPosts(result.data.data);
    }
    const result2 = await axios.get("http://localhost:8080/api/posts/liked/"+username, {
      params: user,
      withCredentials: true,
    });
    console.log(result2);
    if(result2.data.success){
      setLikedPosts(result2.data.data)
    }

    const result3 = await axios.get("http://localhost:8080/api/user/"+username,{
      withCredentials:true
    });
    console.log(result3);
    if(result3.data.success){
      setUserData(result3.data.data);
      console.log(userData);
    }

    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <Topbar /> */}
      {isLoading?(<></>):(<> <div className="profile">
        {/* <Sidebar /> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverImgUrl}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profileImgUrl}
                alt=""
              />
            </div>
            <div style={{ height: "20px" }}></div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{userData.username}</h4>
                <span className="profileInfoDesc">{userData.description}</span>

                
                <Button className="btn" variant="outlined"><Link
                href="/upload"
                // style={{ color: "#22577A", marginLeft: "5px" }}
                underline="none"
              >
                Create Post
              </Link></Button>
                <Button className="btn" variant="outlined"><Link
                href="/updateProfile"
                // style={{ color: "#22577A", marginLeft: "5px" }}
                underline="none"
              >
                Update Profile
              </Link></Button>
            </div>
          </div>
          <div>
            <Tabs
              className="TabContainer"
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              <Tab value="one" label="Your Posts" className="tabs" />
              <Tab value="two" label="Liked Posts" className="tabs" />
              <Tab value="three" label="About" className="tabs" />
            </Tabs>
          </div>
          <div id="one">
            <ImageListShow posts={posts} />
          </div>
          <div id="two" className="mystyle">
            <ImageListShow posts={likedPosts} />

          </div>
          <div id="three" className="mystyle profileInfo">
          <span className="profileInfoDesc">
                <Button className="btn" variant="text" disabled>Name</Button>
                <Button className="btn" variant="text" disabled>{user.Fname} {user.Lname}</Button>
                </span>
          <span className="profileInfoDesc">
                <Button className="btn" variant="text" disabled>Country of Origin</Button>
                <Button className="btn" variant="text" disabled>{user.country}</Button>
                </span>
                <span className="profileInfoDesc">
                <Button className="btn" variant="text" disabled>Date of Birth</Button>
                <Button className="btn" variant="text" disabled>{user.DOB}</Button>
                </span>
          </div>
          <div className="profileRightBottom">
          </div>
        </div>
      </div></>)}
    </>
  );
}

