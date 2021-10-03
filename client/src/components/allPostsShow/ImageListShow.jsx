import React, { useEffect, useState } from 'react';
import Post from './post';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
const url = "https://jsonplaceholder.typicode.com/photos";
function ImageListShow(){
    const [data ,getdata]= useState([]);
    const fetchPost= async ()=>{
        
        const response= await fetch(url);
        const data = await response.json();
        const shortdata=data.slice(1, 10 + 1);//for getting small amount of data
        getdata(shortdata);
    }
    useEffect(()=>{
        
        fetchPost();
    },[]);
    console.log(data);
    return <Grid container spacing={5} className="container1">{

        data.map((x)=> {

         return (
            <Post title={x.title} imgurl={x.url} id={x.id}/>    )
        })
    }
    </Grid>;

}
export default ImageListShow;