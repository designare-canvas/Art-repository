import React, { useRef } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import Divider from "@mui/material/Divider";
import PostArea from "../../components/postArea/postArea";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "./Post.scss";

function Post() {
  const sidebar = useRef();

  const collapse = () => {
    sidebar.style.width = 0;
  };

  return (
    <>
      <Navbar />
      <div className="Post-page">
        <PostArea
          imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
          postTitle="first"
          authorName="hsh"
          postImgUrl="https://cdn.dribbble.com/users/1150809/screenshots/16485499/media/02e55b3a0d537c1335c05400518d5e45.jpg"
          postDescription={
            "Hello Designares ⚡\nHere is my new shot✌\nHope you enjoyed it! ❤️ Thanks for your likes and comments! 💬\nFollow Me : IG | TW | BE Contact me: Email"
          }
        />
        <Divider orientation="vertical" flexItem>
          <KeyboardArrowLeftIcon onClick={collapse} />
        </Divider>
        <div ref={sidebar}>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Post;
