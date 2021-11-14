import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/allPostsShow/ImageListShow";
import Filter from "../../components/filter/filter";
import Footer from "../../components/footer/footer";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";

function Home() {
  const [posts, setPosts] = useState([]);

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
      setPosts(shuffle(result.data.data).slice(1, 12 + 1));
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="home">
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          bgcolor: "background.paper",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 1,
          fontWeight: "bold",
          width: "auto",
          height: 300,
          margin: "2%",
          textAlign: "center",
          backgroundColor: "#EEEEEE",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", md: "flex-start" },
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          <Typography
            variant="h1"
            className="heading"
            style={{
              fontFamily: "Rajdhani",
              fontStyle: "cursive",
              fontSize: "1.85rem",
              fontWeight: "700",
              color: "#22577A",
            }}
          >
            designare is the go-to resource for discovering <br /> and
            connecting with designers and creative talent <br />
            around the globe.
            <br />
            Dream , Depict , Develop
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Some design"
          src=""
        />
      </Box>
      <Filter shuffle={shuffle} setPosts={setPosts} />
      <Posts posts={posts} />
      <Footer />
    </div>
  );
}

export default Home;
