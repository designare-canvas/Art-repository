import React, { useEffect, useState , useContext} from "react";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/allPostsShow/ImageListShow";
import Filter from "../../components/filter/filter";
import Footer from "../../components/footer/footer";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import bannerimg from './wallpaperflare.com_wallpaper.jpg';
import { AuthContext } from "../../Context/Authcontext";

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
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
      {!user && <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: 1,
          fontWeight: 'bold',
          width: "auto",
          height: 425,
          margin: "2%",
          textAlign: "center",
          backgroundImage: `url(${bannerimg})`
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          <Typography
            variant="h1"
            className="heading"
            style={{
              fontFamily: "Josefin Sans",
              fontStyle: "cursive",
              fontSize: "1.75rem",
              fontWeight: "500",
              color: "#22577A",
            }}
          >
            <i style={{ fontSize: "4rem", fontFamily: "Allison" }}> Designare </i> is the go-to resource for discovering and <br />   connecting with designers
            and creative talent  around<br />around the globe.
          </Typography>
          <Typography
            variant="h1"
            className="heading"
            style={{
              fontFamily: "Josefin Sans",
              fontStyle: "cursive",
              fontSize: "2.5rem",
              fontWeight: "800",
              lineHeight: 1.5,
              color: "#22577A",
              margin: "4% 0% 0% 10%"
            }}
          >
            Dream , Depict  , Develop
          </Typography>
                   
        </Box>
        <Box
        // component="img"
        // sx={{
        //     height: 300,
        //     width: "50%",
        //     // maxHeight: { xs: 233, md: 167 },
        //     // maxWidth: { xs: 350, md: 250 },
        //     marginLeft:"20%"
        // }}
        // alt="Some design"
        // src={} 
        />
               
      </Box>
      }
      <Filter shuffle={shuffle} setPosts={setPosts} />
      <Posts posts={posts} />
      <Footer />
    </div>
  );
}

export default Home;
