import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/allPostsShow/ImageListShow";
import Filter from "../../components/filter/filter";
import Footer from "../../components/footer/footer";
import axios from "axios";

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
  }, []);

  return (
    <div className="home">
      <Navbar />
      <Filter shuffle={shuffle} setPosts={setPosts}/>
      <Posts posts={posts}/>
      <Footer />
    </div>
  );
}

export default Home;
