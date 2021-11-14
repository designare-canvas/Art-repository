import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/allPostsShow/ImageListShow";
import Filter from '../../components/filter/filter';
import Footer from "../../components/footer/footer";
import Box from '@mui/material/Box';
import { Typography } from "@material-ui/core";
function Home() {
    return (
        <div className="home">
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: 1,
                    fontWeight: 'bold',
                    width:"auto",
                    height: 300,
                    margin: "2%",
                    textAlign:"center",
                    backgroundColor: '#EEEEEE',
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
                    fontFamily: "Rajdhani",
                    fontStyle:"cursive",
                    fontSize: "1.85rem",
                    fontWeight: "700",
                    color: "#22577A",
                    }}
                >
                    designare is the go-to resource for discovering  <br />  and connecting with designers
                     and creative talent <br />around the globe.
                    <br />
                    Dream , Depict  , Develop
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
            <Filter />
            
            <Posts />
            <Footer />
        </div>
    )
}

export default Home
