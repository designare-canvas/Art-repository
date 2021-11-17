import React, { useState } from "react";
import "./searchbar.scss";
import { useMediaQuery } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@material-ui/core/styles";
import axios from "axios";

export default function Filter(props) {
  const [age, setAge] = useState("");

  const fetchAllPosts = async () => {
    const result = await axios.get("http://localhost:8080/api/posts/all", {
      withCredentials: true,
    });

    if (result.data.success) {
      props.setPosts(props.shuffle(result.data.data).slice(0, 12));
    }
  };

  const handleSearchChange = async (event) => {
    const result = await axios
      .post(
        "http://localhost:8080/api/search/tags",
        { tags: event.target.value },
        {
          withCredentials: true,
        }
      )
      .catch((err) => console.log(err));

    if (result.data.success) {
      props.setPosts(result.data.data);
    }

    console.log(result.data.data);
  };

  const handleChange = (event) => {
    console.log(event);
    setAge(event.target.value);
  };
  const [primary, setPrimay] = useState("");
  const handleprimary = (event) => {
    console.log(event);
    setPrimay(event.target.value);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1001));
  return (
    <Grid container spacing={2} className="indent">
      <Grid item xs={12} sm={12} className="filter">
        <TextField
          id="outlined-basic"
          style={{ width: "100%" }}
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
            <Stack direction="row" style={{ justifyContent: "space-between" }}>
              <FormControl
                sm={6}
                sx={{ minWidth: 140, minHeight: 20 }}
                style={{ height: "40px" }}
              >
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
                  <MenuItem value={10}>Plastic</MenuItem>
                  <MenuItem value={20}>sculptures</MenuItem>
                  <MenuItem value={30}>Spray-Painted</MenuItem>
                  <MenuItem value={40}>Old Art</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <div
              className="middlebuttons"
              style={{ margin: "auto", textAlign: "center" }}
            >
              <Button variant="text" onClick={fetchAllPosts}>
                All
              </Button>
              <Button variant="text">Abstract</Button>
              <Button variant="text">Graphic</Button>
              <Button variant="text">Art</Button>
            </div>
          </>
        ) : (
          <Stack direction="row" style={{ justifyContent: "space-between" }}>
            <FormControl
              sm={6}
              sx={{ minWidth: 140, minHeight: 20 }}
              style={{ height: "40px" }}
            >
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
              <Button variant="text">Abstract</Button>
              <Button variant="text">Graphic</Button>
              <Button variant="text">Art</Button>
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
                <MenuItem value={10}>Plastic</MenuItem>
                <MenuItem value={20}>sculptures</MenuItem>
                <MenuItem value={30}>Spray-Painted</MenuItem>
                <MenuItem value={40}>Old Art</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}
