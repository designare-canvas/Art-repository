import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/allPostsShow/ImageListShow";
import Filter from '../../components/filter/filter';
import Footer from "../../components/footer/footer";

function Home() {
    return (
        <div className="home">
            <Navbar />
            <Filter />
            <Posts />
            <Footer />
        </div>
    )
}

export default Home
