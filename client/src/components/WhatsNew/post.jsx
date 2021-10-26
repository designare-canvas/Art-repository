import React from "react";
import { Grid, Typography } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import "./post.scss";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  small: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    color: blue[100],
    backgroundColor: red[500],
  },
  left: {
    justifyContent: "space-evenly",
    padding: "0px",
    marginTop: "8px",
  },
  noshadow: {
    boxShadow: "none",
  },
  shadow: {
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    borderRadius: "10px",
  },
}));
function Post(props) {
  const classes = useStyles();
  var title = props.title.substr(0, 7);
  title += "...";
  console.log(title);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className="post">
      <Card className={classes.noshadow} id={props.id}>
        <Link to="/Post" style={{ textDecoration: "none" }}>
          <div className="container">
            <img className="image" src={props.imgurl} alt="post_img" />
            <div className="middle">
              {/* <div className="text"> */}
              <CardActions style={{ justifyContent: "space-evenly" }}>
                <span
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginLeft: "10px",
                  }}
                >
                  {title}
                </span>
                <ButtonGroup className="left" size="medium">
                  <div></div>
                  <IconButton
                    aria-label="add to favorites"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <FavoriteIcon fontSize="middle" className="favicon" />
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <ShareIcon
                      fontSize="middle"
                      color="white"
                      className="favicon"
                    />
                  </IconButton>
                </ButtonGroup>
              </CardActions>
              {/* </div> */}
              {/* <div className="text">John Doe</div> */}
            </div>
          </div>
        </Link>

        <CardActions className={classes.left} style={{justifyContent:"space-evenly"}}>
          <Avatar color="primary" className={classes.small}>
            <Typography
              variant="h6"
              style={{ fontSize: "1.0rem", margin: "0" }}
            >
              {props.title[0]}
            </Typography>
          </Avatar>
          <Typography
            variant="h6"
            color="primary"
            style={{ fontSize: "medium", marginLeft: "0" }}
          >
            {props.name}
          </Typography>

          <div style={{ display: "inline-block" }}>
            {" "}
            <ReactTimeAgo
              date={props.time}
              locale="en-US"
              style={{
                fontSize: "small",
                margin: "0",
                fontFamily: "Verdana",
              }}
            />
          </div>
          <ButtonGroup size="small">
            <IconButton
              aria-label="add to favorites"
              style={{ backgroundColor: "transparent" }}
            >
              <FavoriteIcon fontSize="small" className="favicon" />
              {20}
            </IconButton>
            <IconButton
              aria-label="share"
              style={{ backgroundColor: "transparent" }}
            >
              <ShareIcon fontSize="small" className="favicon" />
            </IconButton>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Post;
