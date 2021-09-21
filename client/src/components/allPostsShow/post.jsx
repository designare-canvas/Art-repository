import React from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from "@material-ui/core/colors";

import ButtonGroup from '@material-ui/core/ButtonGroup';
const useStyles = makeStyles((theme) => ({
    
        root: {
            display: 'flex',
            '& > *': {
              margin: theme.spacing(1),
            },
          },
    
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color:blue[100],
        backgroundColor: red[500],
      },
      left:{
        marginLeft: "auto!important",
        
      },
      noshadow:{
        boxShadow: "none"

      },
      shadow:{
        // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        borderRadius:"10px",

      }
}));
function Post(props) {
    const classes = useStyles();
    var title=props.title.substr(0,7);
    title+='...';
    console.log(title)
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.noshadow} 
        

        id={props.id}>
        
      <div className="container">

      <img className ="image" src={props.imgurl} alt="image"/>
      <div className="middle">
      {/* <Button className="text">John Doe</Button> */}
      <div className="text">
      <CardActions >
      <span style={{ color: 'grey',fontSize:"20px" }}>

      {title}
      </span>
      
        <ButtonGroup className="left" size="medium" >
      <IconButton aria-label="add to favorites"  style={{ backgroundColor: 'transparent' }}>
      
          <FavoriteIcon fontSize="large" className="favicon"/>
          
        </IconButton>
        <IconButton aria-label="share" style={{ backgroundColor: 'transparent' }}>
          <ShareIcon fontSize="large" className="favicon"/>
        </IconButton>
        </ButtonGroup>
      </CardActions>
        </div>
      {/* <div className="text">John Doe</div> */}
      </div>
      </div>
      
      
      <CardActions >
      <Avatar  color="primary" className={classes.small}>{props.title[0]}</Avatar>
      <Button size="small" color="primary" fontSize="small">
      Username
        </Button>
        <ButtonGroup className={classes.left} size="small" >
      <IconButton aria-label="add to favorites" style={{ backgroundColor: 'transparent' }}>
      
          <FavoriteIcon fontSize="small" className="favicon"/>
          {20}
        </IconButton>
        <IconButton aria-label="share" style={{ backgroundColor: 'transparent' }}>
          <ShareIcon fontSize="small" className="favicon"/>
        </IconButton>
        </ButtonGroup>
      </CardActions>
           
        </Card>

        </Grid>)

}

export default Post