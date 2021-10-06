import React from "react";
import "./postArea.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "@mui/material/Button";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Link } from "react-router-dom";

function PostArea(props) {
  return (
    <div className="postArea">
      <div className="postHeader">
        <div className="leftItems">
          <div>
            <img src={props.imgUrl} className="profileImg" alt="posts" />
          </div>
          <div className="postBody">
            <h4>{props.postTitle}</h4>
            <div className="authorLinks">
              <p>{props.authorName}</p>
              <FiberManualRecordIcon sx={{ fontSize: 10, marginTop: "10px" }} />
              <Link to="/">
              <p>Follow</p>
              </Link>
              <FiberManualRecordIcon sx={{ fontSize: 10, marginTop: "10px" }} />
              <Link to="/">
              <p>Hire Me</p>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            style={{
              color: "#000",
              backgroundColor: "#f3f3f4",
              border: "none",
              marginRight: "20px",
              zIndex:"0"
            }}
            size="small"
            startIcon={<CreateNewFolderIcon />}
          >
            Save
          </Button>
          <Button
            variant="contained"
            style={{
              color: "#000",
              backgroundColor: "#f3f3f4",
              border: "none",
              zIndex:"0"
            }}
            size="small"
            startIcon={<FavoriteIcon />}
          >
            Like
          </Button>
        </div>
      </div>
      <div className="postImg">
          <img src={props.postImgUrl} alt="posts" style={{width:"63.8vw", borderRadius:"10px"}} />
      </div>
      <p className="postDescription">
          {props.postDescription}
      </p>
    </div>
  );
}

export default PostArea;
