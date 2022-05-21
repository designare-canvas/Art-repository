import React, { useState,useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/footer";
import Divider from "@mui/material/Divider";
import PostArea from "../../components/postArea/postArea";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import "./Post.scss";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Post() {

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchPosts = async () => {
    const result = await axios.get("http://localhost:8080/api/posts/post/"+id, {
      withCredentials: true,
    });

    console.log(result);
    if (result.data.success) {
      setPosts(result.data.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const sidebar = useRef();

  // const collapse = () => {
  //   sidebar.style.width = 0;
  // };

  return (
    <>
    {
      isLoading ? <> </>:(<>
      <Navbar />
      <div className="Post-page">
        <PostArea
        id={posts.art.id}
          imgUrl={posts.artistImg.profileimgurl}
          postTitle={posts.art.title}
          authorName={posts.art.username}
          postImgUrl={posts.image.imageurl}
          postDescription={
           posts.art.description
          }
          likes={posts.likes}
        />
        <Divider orientation="vertical" flexItem>
          <KeyboardArrowLeftIcon />
        </Divider>
        <div>
          <Sidebar likes={posts.likes} artistImg={posts.artistimg} comment={posts.comments} fetchPosts={fetchPosts} />
        </div>
      </div>
      <Footer />
    </>)
    }
    </>
    
  );
}

export default Post;
