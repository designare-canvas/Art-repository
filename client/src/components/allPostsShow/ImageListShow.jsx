import React from 'react';
import Post from './post';
import Grid from '@material-ui/core/Grid';

function ImageListShow(props){
    console.log(props.posts);
    return <Grid container spacing={5} className="container1">{
       

        props.posts.map((x)=> {

         return (
            <Post title={x.art.title} artist={x.art.username} artistImg={x.artistImg} likes={x.likes} imgSrc={x.image.imageUrl} id={x.art.id}/>    )
        })
    }
    </Grid>;

}
export default ImageListShow;