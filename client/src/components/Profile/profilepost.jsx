import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import './post.scss';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/Authcontext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
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
    justifyContent: 'space-evenly',
    padding: '0px',
    marginTop: '8px',
  },
  noshadow: {
    boxShadow: 'none',
  },
  shadow: {
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    borderRadius: '10px',
  },
}));
function Post(props) {
  const classes = useStyles();
  var title = props.title;
  title += '...';

  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(props.likes);
  let history = useHistory();

  const handleLikeChange = async (e) => {
    if (user) {
      if (e.target.checked) {
        const result = await axios.post('/api/posts/like', {
          username: user.username,
          postId: props.id,
        });
        console.log(result);
        setLikes((prev) => prev + 1);
      } else {
        const result = await axios.delete('/api/posts/like', {
          data: { id: props.id, username: user.username },
        });
        console.log(result);
        setLikes((prev) => prev - 1);
      }
    } else {
      history.push('/Signin');
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className="post">
      <Card className={classes.noshadow} id={props.id}>
        <Link to={`/Post/${props.id}`} style={{ textDecoration: 'none' }}>
          <div to="/Post" style={{ textDecoration: 'none' }}>
            <div className="container">
              <img className="image" src={props.imgurl} alt="post_img" />
              <div className="middle">
                {/* <div className="text"> */}
                <CardActions style={{ justifyContent: 'space-evenly' }}>
                  <span style={{ color: 'white', fontSize: '20px', marginLeft: '10px' }}>
                    {title}
                  </span>
                  <ButtonGroup className="left" size="medium">
                    <IconButton aria-label="share" style={{ backgroundColor: 'transparent' }}>
                      <ShareIcon fontSize="middle" color="white" className="favicon" />
                    </IconButton>
                  </ButtonGroup>
                </CardActions>
                {/* </div> */}
                {/* <div className="text">John Doe</div> */}
              </div>
            </div>
          </div>
        </Link>

        <CardActions className={classes.left}>
          <Typography size="small" variant="h7" style={{ marginRight: 'auto' }}>
            {props.artist}
          </Typography>
          <ButtonGroup size="small">
            <IconButton aria-label="add to favorites" style={{ backgroundColor: 'transparent' }}>
              <Checkbox
                className="favicon"
                onChange={handleLikeChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
              {likes}
            </IconButton>
            <IconButton aria-label="share" style={{ backgroundColor: 'transparent' }}>
              <ShareIcon fontSize="small" className="favicon" />
            </IconButton>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Post;
