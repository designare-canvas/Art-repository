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
                src="data:image/jpeg;base64,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"
                alt=""
              />
              <img
                className="profileUserImg"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
            <div style={{ height: "20px" }}></div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userData.username}</h4>
              <span className="profileInfoDesc">{userData.description}</span>
              <span className="profileInfoDesc">
              </span>
              <Button className="btn" variant="outlined">
                <Link
                  href="/updateProfile"
                  // style={{ color: "#22577A", marginLeft: "5px" }}
                  underline="none"
                >
                  Update Profile
                </Link>
              </Button>
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
              <Button className="btn" variant="text" disabled>
                Country of Origin
              </Button>
              <Button className="btn" variant="text" disabled>
                India
              </Button>
            </span>
            <span className="profileInfoDesc">
              <Button className="btn" variant="text" disabled>
                Date of Birth
              </Button>
              <Button className="btn" variant="text" disabled>
                10/10/10
              </Button>
            </span>
          </div>
          <div className="profileRightBottom"></div>
        </div>
      </div></>)}
    </>
  );
}
