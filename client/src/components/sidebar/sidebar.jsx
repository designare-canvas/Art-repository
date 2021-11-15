import React, { useState, useEffect, useContext, } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { Button,TextField } from "@material-ui/core";
import Comment from "../../components/comment/comment.jsx";
import { IconButton } from "@material-ui/core";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AuthContext } from "../../Context/Authcontext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import './sidebar.scss';

function Sidebar(props) {
  const [comment, setComment] = useState(null);
  const { user } = useContext(AuthContext);
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!comment){
      alert("Please comment first!");
      return;
    }
    console.log(comment);
    const res = await axios
      .post("http://localhost:8080/api/posts/art", comment, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    
      if(res){
        if(res.data.success)  history.push("/");
        else  alert(res.data.message);
      }
    console.log(res);
  };
  return (
    <div>
      <div className="sidebar">
        <div className="icons">
          <div>
            <IconButton aria-label="share">
              <ShareIcon />
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
        {props.comment.map((data) => {
          return (
            <Comment
              imgUrl={data.url}
              name={data.name}
              comment={data.comment}
            />
          );
        })}
        <form onSubmit={handleSubmit} style={{width:"100%"}}>
        <TextField
          fullWidth
          variant="outlined"
          label="Write a  Comment"
          margin="normal"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
          <Button style={{ backgroundColor: "#22577A", textTransform: "none", color: "white" }}
            type="submit"
            variant="outlined" >
            Comment
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Sidebar;
