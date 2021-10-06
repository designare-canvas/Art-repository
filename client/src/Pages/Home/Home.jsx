import React from 'react'
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/allPostsShow/ImageListShow";
import Filter from '../../components/filter/filter';

function Home() {
    return (
        <div>
            <Navbar />
            <Filter />
            <Posts />

        </div>
    )
}

export default Home
