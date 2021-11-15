import "./profile.scss";
import React,{useContext, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ImageListShow from "./profilepostlistshow";
import Link from "@material-ui/core/Link";
import { AuthContext } from "../../Context/Authcontext";
import axios from "axios";

export default function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user)
    const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    var element1 = document.getElementById('one');
    var element2 = document.getElementById('two');
    var element3 = document.getElementById('three');
    if(!element1.classList.contains("mystyle")){

        element1.classList.toggle("mystyle");
    }
    if(!element2.classList.contains("mystyle")){

        element2.classList.toggle("mystyle");
    }if(!element3.classList.contains("mystyle")){

        element3.classList.toggle("mystyle");
    }
    console.log(value)
    var element = document.getElementById(newValue);
    element.classList.toggle("mystyle");
    console.log(element1)
    setValue(newValue);
  };
  var follower=10;//change it by the number of follower
  var following=0;//change it by the number of following
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const result = await axios.get("http://localhost:8080/api/posts/user/"+user.username, {
      withCredentials: true,
    });

    console.log(result);
    if (result.data.success) {
      setPosts(shuffle(result.data.data));
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(posts);
  const myPostUrl="https://jsonplaceholder.typicode.com/photos";//change with url giving the post person created
  const myLikedPostUrl="https://jsonplaceholder.typicode.com/photos";//change with url liked post
  var bio=user.discription// change it by the bio of user
  var name=user.username//change it by the name of user
 
  return (
    <>
      {/* <Topbar /> */}
      <div className="profile">
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
            <div style={{height:"20px"}}></div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{name}</h4>
                <span className="profileInfoDesc">{bio}</span>
                
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
        <Tab
          value="one"
          label="Your Posts"
          className="tabs"
        />
        <Tab value="two" label="Liked Posts" className="tabs" />
        <Tab value="three" label="About" className="tabs"/>
      </Tabs>

          </div>
          <div id="one" >
             
              <ImageListShow data={posts}/>
          </div>
          <div id="two" className="mystyle">
             
              {/* <ImageListShow url={myLikedPostUrl}/> */}
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
      </div>
    </>
  );

}