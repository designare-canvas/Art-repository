import React from 'react';
<<<<<<< HEAD
import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/sidebar";
import Footer from '../../components/footer/footer';
import Divider from "@mui/material/Divider";
import PostArea from "../../components/postArea/postArea";
=======
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Navbar from '../../components/navbar/Navbar';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import Comment from '../../components/comment/comment.jsx';
import { IconButton } from '@material-ui/core';
import Footer from '../../components/footer/footer'
>>>>>>> 8e03f86d79d24d8b848b0d18daeb1065dde956de
import './Post.scss';

function Post() {

    return (
        <>
            <Navbar />
            <div className="Post-page">
<<<<<<< HEAD
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
=======
                <div className="image-area">
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="sidebar">
                    <div className="icons">
                        <div>
                        <IconButton aria-label="share">
                            <ShareIcon  />
                        </IconButton>
                        <IconButton aria-label="save">
                            <CreateNewFolderIcon  />
                        </IconButton>
                        <IconButton aria-label="favorite">
                            <FavoriteIcon  />
                        </IconButton>
                        </div>
                        <div>
                            <Button variant="outlined" startIcon={<InfoIcon />} style={{color:"rgba(0,0,0,0.54)", borderColor:"rgba(0,0,0,0.54)"}} >
                                Details
                            </Button>
                        </div>
                    </div>
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                    <Comment imgUrl="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg"
                        name="daniel"
                        comment="Nice work"
                        timeAgo="17"
                      />
                </div>
>>>>>>> 8e03f86d79d24d8b848b0d18daeb1065dde956de
            </div>
            <Footer />
        </>
    )
}

export default Post
