import React from 'react';
import Post from '../allPostsShow/post';
import Grid from '@material-ui/core/Grid';

function WhatsNew(props) {
  console.log("In whatsnew");
 
  props.posts.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.art.timestamp) - new Date(a.art.timestamp);
  });
  console.log(props.posts);
    return <Grid container spacing={5} className="container1">{
       

        props.posts.map((x)=> {

         return (
           <Post title={x.art.title} artist={x.art.username} artistImg={x.artistImg} likes={x.likes} imgSrc={x.image.imageUrl} id={x.art.id} where="whatsnew" time= {x.art.timestamp }/>    )
        })
    }
    </Grid>;

}
export default WhatsNew;