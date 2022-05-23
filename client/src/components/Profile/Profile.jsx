import './profile.scss';
import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ImageListShow from './profilepostlistshow';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import { AuthContext } from '../../Context/Authcontext';
import { useParams } from 'react-router-dom';
import { getThemeProps } from '@material-ui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CategoryIcon from '@mui/icons-material/Category';
import ApplyNow from './applynow';
import CreateUpdateBtn from './update/createbutton';

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { user, isAdmin } = useContext(AuthContext);
  const [value, setValue] = React.useState('one');
  const [userData, setUserData] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const { username } = useParams();

  const handleChange = (event, newValue) => {
    var element1 = document.getElementById('one');
    var element2 = document.getElementById('two');
    var element3 = document.getElementById('three');
    if (!element1.classList.contains('mystyle')) {
      element1.classList.toggle('mystyle');
    }
    if (!element2.classList.contains('mystyle')) {
      element2.classList.toggle('mystyle');
    }
    if (!element3.classList.contains('mystyle')) {
      element3.classList.toggle('mystyle');
    }
    var element = document.getElementById(newValue);
    element.classList.toggle('mystyle');
    setValue(newValue);
  };

  const fetchData = async () => {
    const result3 = await axios.get('/api/user/' + username, {
      withCredentials: true,
    });
    console.log(result3);

    const { profileimgurl, coverimgurl, ...other } = result3.data.data;
    if (result3.data.success) {
      setUserData(result3.data.data);
      console.log(userData);
    }
    console.log(other);
    const result = await axios.get('/api/posts/user/' + username, {
      params: other,
      withCredentials: true,
    });
    console.log(result);

    if (result.data.success) {
      setPosts(result.data.data);
    }

    const result2 = await axios.get('/api/posts/liked/' + username, {
      params: other,
      withCredentials: true,
    });
    console.log(result2);
    if (result2.data.success) {
      setLikedPosts(result2.data.data);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <Topbar /> */}
      {isLoading ? (
        <></>
      ) : (
        <>
          {' '}
          <div className="profile">
            {/* <Sidebar /> */}
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img className="profileCoverImg" src={userData.coverimgurl} alt="" />
                  <img className="profileUserImg" src={userData.profileimgurl} alt="" />
                </div>
                <div style={{ height: '20px' }}></div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{userData.username}</h4>
                  <span className="profileInfoDesc">{userData.description}</span>
                  {user && (username === user.username || isAdmin) && (
                    <CreateUpdateBtn username={username} />
                  )}
                </div>
              </div>
              <div>
                <Tabs
                  className="TabContainer"
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                >
                  <Tab value="one" label="Your Posts" className="tabs" />
                  <Tab value="two" label="Liked Posts" className="tabs" />
                  <Tab value="three" label="About" className="tabs" />
                </Tabs>
              </div>
              <div id="one">
                {user && userData.username === user.username && !userData.isartist && <ApplyNow />}
                {userData.isartist && <ImageListShow posts={posts} />}
              </div>
              <div id="two" className="mystyle">
                <ImageListShow posts={likedPosts} />
              </div>
              <div id="three" className="mystyle profileInfo">
                <span className="profileInfoDesc">
                  <Button className="btn" variant="text" disabled>
                    Name
                  </Button>
                  <Button className="btn" variant="text" disabled>
                    {userData.fname} {userData.lname}
                  </Button>
                </span>
                <span className="profileInfoDesc">
                  <Button className="btn" variant="text" disabled>
                    Country of Origin
                  </Button>
                  <Button className="btn" variant="text" disabled>
                    {userData.country}
                  </Button>
                </span>
                <span className="profileInfoDesc">
                  <Button className="btn" variant="text" disabled>
                    Email
                  </Button>
                  <Button className="btn" variant="text" disabled>
                    {userData.email}
                  </Button>
                </span>
                <span className="profileInfoDesc">
                  <Button className="btn" variant="text" disabled>
                    Date of Birth
                  </Button>
                  <Button className="btn" variant="text" disabled>
                    {userData.dob.split('T')[0]}
                  </Button>
                </span>
              </div>
              <div className="profileRightBottom"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
