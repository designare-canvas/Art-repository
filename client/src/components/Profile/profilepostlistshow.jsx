import React from 'react';
import Post from './profilepost';
import Grid from '@material-ui/core/Grid';

function ImageListShow(props) {
  return (
    <Grid container spacing={5} className="container1">
      {props.posts.map((x) => {
        return (
          <Post
            title={x.art.title}
            artist={x.art.username}
            imgurl={x.image.imageurl}
            likes={x.likes}
            id={x.art.id}
          />
        );
      })}
    </Grid>
  );
}
export default ImageListShow;
