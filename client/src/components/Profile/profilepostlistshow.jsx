<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Post from './profilepost';
import Grid from '@material-ui/core/Grid';

function ImageListShow(props){
  const url = props.url;
  const [data, getdata] = useState([]);
  const fetchPost = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const shortdata = data.slice(1, 10 + 1); //for getting small amount of data
    getdata(shortdata);
  };
  useEffect(() => {
    fetchPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

=======
import React, { useEffect, useState } from "react";
import Post from "./profilepost";
import Grid from "@material-ui/core/Grid";

function ImageListShow(props) {
  const url = props.url;
  const [data, getdata] = useState([]);
  const fetchPost = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const shortdata = data.slice(1, 10 + 1); //for getting small amount of data
    getdata(shortdata);
  };
  useEffect(() => {
    fetchPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
>>>>>>> 1ba5f0ac4fde506fc617c64a69045aa89153e9f1
  console.log(data);
  return (
    <Grid container spacing={5} className="container1">
      {data.map((x) => {
        return <Post title={x.title} imgurl={x.url} id={x.id} />;
      })}
    </Grid>
  );
}
export default ImageListShow;
