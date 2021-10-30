import React, { useEffect, useState } from "react";
import Post from "./post";
import { Grid } from "@material-ui/core";
import Navbar from "../navbar/Navbar.jsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Filter from "../../components/filter/filter";
import fakes from "./local";
const url = "https://jsonplaceholder.typicode.com/photos";
const useStyles = makeStyles((theme) => ({
  hero: {
    // backgroundImage: `url(${Background})`,
    backgroundColor: "#F9F9F9",
    height: "100px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#22577A",
    fontSize: "3.8rem",
    fontFamily: "Josefin Sans",
    [theme.breakpoints.down("sm")]: {
      height: 80,
      fontSize: "2.5em",
    },
  },
}));

function ImageListShow() {
  fakes.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.time) - new Date(a.time);
  });
  const classes = useStyles();
  const username = "Akash Singh";
  const [data, getdata] = useState([]);
  const fetchPost = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const shortdata = data.slice(1, 10 + 1); //for getting small amount of data
    getdata(shortdata);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  console.log(data);
  return (
    <>
      <Navbar />
      <Box className={classes.hero}>
        <Box>Nouveau Designs</Box>
      </Box>
      <Filter />
      <Grid container spacing={5} className="container1">
        {fakes.map((x) => {
          return (
            <Post
              title={x.title}
              imgurl={x.url}
              id={x.id}
              time={x.time}
              name={username}
            />
          );
        })}
      </Grid>
    </>
  );
}
export default ImageListShow;
