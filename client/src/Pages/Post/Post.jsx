import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/sidebar";
import Footer from '../../components/footer/footer';
import Divider from "@mui/material/Divider";
import PostArea from "../../components/postArea/postArea";
import './Post.scss';

function Post() {

    return (
        <>
            <Navbar />
            <div className="Post-page">
              <PostArea imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                postTitle="first"
                authorName="hsh"
                postImgUrl="https://cdn.dribbble.com/users/1150809/screenshots/16485499/media/02e55b3a0d537c1335c05400518d5e45.jpg"
                postDescription="Hello Designares ⚡
                  Here is my new shot✌
                  Hope you enjoyed it! ❤️ Thanks for your likes and comments! 💬
                  Follow Me : IG | TW | BE Contact me: Email"
               />
              <Divider orientation="vertical" flexItem />
              <Sidebar /> 
            </div>
            <Footer />
        </>
    )
}

export default Post
