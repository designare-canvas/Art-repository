import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/WhatsNew/WhatsNew.jsx";
import Filter from "../../components/filter/filter";
import Footer from "../../components/footer/footer";
import axios from "axios";
import Box from "@mui/material/Box";
// import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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


function WhatsNew() {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  const fetchPosts = async () => {
    const result = await axios.get("http://localhost:8080/api/posts/all", {
      withCredentials: true,
    });

    console.log(result);
    if (result.data.success) {
      setPosts(shuffle(result.data.data).slice(0, 12));
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home">
        <Navbar />
        <Box className={classes.hero}>
            <Box>Nouveau Designs</Box>
        </Box>
        <Filter shuffle={shuffle} setPosts={setPosts} />
        <Posts posts={posts} />
        <Footer />
    </div>
  );
}

export default WhatsNew;
