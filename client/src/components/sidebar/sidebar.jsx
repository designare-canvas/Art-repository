import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import Comment from "../../components/comment/comment.jsx";
import { IconButton } from "@material-ui/core";
import ShareIcon from "@mui/icons-material/Share";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import './sidebar.scss';

function Sidebar() {
  const temp = [
    {
      url: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
      name: "daniel",
      comment: "Nice work",
    },
    {
      url: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
      name: "daniel",
      comment: "Nice work",
    },
    {
      url: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
      name: "daniel",
      comment: "Nice work",
    },
    {
      url: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
      name: "daniel",
      comment: "Nice work",
    },
    {
      url: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
      name: "daniel",
      comment: "Nice work",
    },
    {
      url: "https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg",
      name: "daniel",
      comment: "Nice work",
    },
  ];

  return (
    <div>
      <div className="sidebar">
        <div className="icons">
          <div>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="save">
              <CreateNewFolderIcon />
            </IconButton>
            <IconButton aria-label="favorite">
              <FavoriteIcon />
            </IconButton>
          </div>
          <div>
            <Button
              variant="outlined"
              startIcon={<InfoIcon />}
              style={{
                color: "rgba(0,0,0,0.54)",
                borderColor: "rgba(0,0,0,0.54)",
              }}
            >
              Details
            </Button>
          </div>
        </div>
        <br />
        <h2>Feedback</h2>
        {temp.map((data) => {
          return (
            <Comment
              imgUrl={data.url}
              name={data.name}
              comment={data.comment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
