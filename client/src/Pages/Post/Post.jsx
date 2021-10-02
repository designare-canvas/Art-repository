import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import Divider from '@mui/material/Divider';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { makeStyles, useTheme, alpha } from "@material-ui/core/styles";
import Navbar from '../../components/navbar/Navbar';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Comment from '../../components/comment/comment.jsx';
import { IconButton } from '@material-ui/core';
import './Post.scss';

function Post() {

    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
    }));

    const classes= useStyles();

    return (
        <>
            <Navbar />
            <div className="Post-page">
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
                            <Button variant="outlined" startIcon={<InfoIcon />} className={classes.icons} style={{color:"rgba(0,0,0,0.54)", borderColor:"rgba(0,0,0,0.54)"}} >
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
            </div>
        </>
    )
}

export default Post
