import React from 'react';
import Post from '../allPostsShow/post';
import Grid from '@material-ui/core/Grid';

function WhatsNew(props) {
  console.log("In whatsnew");
  console.log(props.posts);
  props.posts.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.time) - new Date(a.time);
  });
    return <Grid container spacing={5} className="container1">{
       

        props.posts.map((x)=> {

         return (
           <Post title={x.art.title} artist={x.art.username} artistImg={x.artistImg} likes={x.likes} imgSrc={x.image.imageUrl} id={x.art.id} where="whatsnew" time= {x.art.timestamp }/>    )
        })
    }
    </Grid>;

}
export default WhatsNew;