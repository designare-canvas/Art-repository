import React from "react";
import Post from "./profilepost";
import Grid from "@material-ui/core/Grid";

function ImageListShow(props) {
  
  const data=props.data;
  console.log(data);
  return (
    <Grid container spacing={5} className="container1">
      {data.map((x) => {
        return <Post data ={x} title={x.art.title} imgurl={x.image.imageUrl} id={x.art.id} username={x.art.username} />;
      })}
    </Grid>
  );
}
export default ImageListShow;
