
import React, { useContext } from "react";
import "./postArea.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Button from "@mui/material/Button";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Link } from "react-router-dom";
import { AuthContext } from "../../Context/Authcontext";
function PostArea(props) {
  const { user } = useContext(AuthContext);
  console.log(user);
  console.log(props);
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
              <FiberManualRecordIcon sx={{ fontSize: 8, marginTop: "12px" }} />
              <Link to="/">
              <p>Follow</p>
              </Link>
              <FiberManualRecordIcon sx={{ fontSize: 8, marginTop: "12px" }} />
              <Link to="/">
              <p>Hire Me</p>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {(user && user.username === props.authorName)? (
            <>
              <Link to={{
                pathname: "/upload",
                state: props
              }}
              style={{ textDecoration: "none" }}>
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
              startIcon={<EditIcon />}
            >
              Edit
                </Button>
                </Link>
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
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            </>
          ) : ( 
            <>
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
          </>)}
         
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
      <div className="postDescription">
          {props.postDescription}
      </div>
    </div>
  );
}

export default PostArea;
