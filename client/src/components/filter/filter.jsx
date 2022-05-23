import React, { useState } from 'react';
import './searchbar.scss';
import { useMediaQuery } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';

export default function Filter(props) {
  const [age, setAge] = useState('');

  const fetchAllPosts = async () => {
    const result = await axios.get('/api/posts/all', {
      withCredentials: true,
    });

    if (result.data.success) {
      props.setPosts(props.shuffle(result.data.data).slice(0, 12));
    }
  };

  const fetchAllpostsAndSort = async (prop) => {
    const result = await axios.get('/api/posts/all', {
      withCredentials: true,
    });

    if (result.data.success) {
      if (prop === 'likes') {
        console.log(result.data.data.sort((a, b) => b.likes - a.likes));
        props.setPosts(result.data.data.sort((a, b) => b.likes - a.likes));
      } else if (prop === 'random') {
        props.setPosts(props.shuffle(result.data.data).slice(0, 12));
      } else {
        props.setPosts(
          result.data.data.sort(function (a, b) {
            return new Date(b.art.timestamp) - new Date(a.art.timestamp);
          }),
        );
      }
    }
  };

  const searchByTags = async (value) => {
    const result = await axios
      .post(
        '/api/search/tags',
        { tags: value },
        {
          withCredentials: true,
        },
      )
      .catch((err) => console.log(err));

    if (result.data.success) {
      props.setPosts(result.data.data);
    }

    console.log(result.data.data);
  };

  const handleClick = (props) => () => {
    searchByTags(props);
  };

  const handleSearchChange = async (event) => {
    await searchByTags(event.target.value);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setAge(event.target.value);
    switch (event.target.value) {
      case 10:
        searchByTags('painting');
        break;
      case 20:
        searchByTags('contemporary');
        break;
      case 30:
        searchByTags('modernart');
        break;
      case 40:
        searchByTags('sketch');
        break;
    }
  };
  const [primary, setPrimay] = useState('');
  const handleprimary = (event) => {
    console.log(event.target.value);
    setPrimay(event.target.value);
    switch (event.target.value) {
      case 10:
        fetchAllpostsAndSort('likes');
        break;
      case 20:
        fetchAllpostsAndSort('random');
        break;
      case 30:
        fetchAllpostsAndSort('time');
        break;
    }
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1001));
  return (
    <Grid container spacing={2} className="indent">
      <Grid item xs={12} sm={12} className="filter">
        <TextField
          id="outlined-basic"
          style={{ width: '100%' }}
          label="Seach Tags"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
        />

        {/* </Box> */}
      </Grid>
      <Grid item xs={12} sm={12}>
        {isMobile ? (
          <>
            <Stack direction="row" style={{ justifyContent: 'space-between' }}>
              <FormControl sm={6} sx={{ minWidth: 140, minHeight: 20 }} style={{ height: '40px' }}>
                <InputLabel id="demo-simple-select-helper-label" size="small">
                  Explore
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={primary}
                  label="Explore"
                  size="small"
                  onChange={handleprimary}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Most Popular</MenuItem>
                  <MenuItem value={20}>Trending</MenuItem>
                  <MenuItem value={30}>Newest</MenuItem>
                </Select>
              </FormControl>
              <FormControl sm={6} sx={{ minWidth: 140 }}>
                <InputLabel id="demo-simple-select-helper-label" size="small">
                  Filter
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  label="Filter"
                  size="small"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Painting</MenuItem>
                  <MenuItem value={20}>Contemporary</MenuItem>
                  <MenuItem value={30}>Modern art</MenuItem>
                  <MenuItem value={40}>sketch</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <div className="middlebuttons" style={{ margin: 'auto', textAlign: 'center' }}>
              <Button variant="text" onClick={fetchAllPosts}>
                All
              </Button>
              <Button variant="text" onClick={handleClick('abstract')}>
                Abstract
              </Button>
              <Button variant="text" onClick={handleClick('graphic')}>
                Graphic
              </Button>
              <Button variant="text" onClick={handleClick('art')}>
                Art
              </Button>
            </div>
          </>
        ) : (
          <Stack direction="row" style={{ justifyContent: 'space-between' }}>
            <FormControl sm={6} sx={{ minWidth: 140, minHeight: 20 }} style={{ height: '40px' }}>
              <InputLabel id="demo-simple-select-helper-label" size="small">
                Explore
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={primary}
                label="Explore"
                size="small"
                onChange={handleprimary}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Most Popular</MenuItem>
                <MenuItem value={20}>Trending</MenuItem>
                <MenuItem value={30}>Newest</MenuItem>
              </Select>
            </FormControl>
            <div>
              <Button variant="text" onClick={fetchAllPosts}>
                All
              </Button>
              <Button variant="text" onClick={handleClick('abstract')}>
                Abstract
              </Button>
              <Button variant="text" onClick={handleClick('graphic')}>
                Graphic
              </Button>
              <Button variant="text" onClick={handleClick('art')}>
                Art
              </Button>
            </div>

            <FormControl sm={6} sx={{ minWidth: 140 }}>
              <InputLabel id="demo-simple-select-helper-label" size="small">
                Filter
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Filter"
                onChange={handleChange}
                size="small"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Painting</MenuItem>
                <MenuItem value={20}>Contemporary</MenuItem>
                <MenuItem value={30}>Modern art</MenuItem>
                <MenuItem value={40}>sketch</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}
