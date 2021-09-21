import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@material-ui/core";
// import GoogleButton from "react-google-button";
// import { AccountCircle, LockRounded } from "@material-ui/icons";
// import clsx from "clsx";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
// import IconButton from "@material-ui/core/IconButton";

export default function Login() {
  return (
    <div style={{ margin: "0" }}>
      <Grid
        container
        style={{
          minHeight: "100vh",
          maxWidth: "150vh",
        }}
      >
        <Grid item xs={12} sm={6} style={{ backgroundColor: "#22577A" }}>
          {/* left side  or side nav */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2970/2970785.png"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt="brand"
          />
          {/* <div style={{ margin: "20% 40% 0% 0%" }}>
            <Typography
              variant="h2"
              style={{
                fontFamily: "Allison",
                fontStyle: "cursive",
                fontSize: "12vh",
                color: "#FEFBF3"
              }}
            >
            
              Designare
            </Typography>
            <Typography
              variant="h2"
              style={{
                fontFamily: "Lato",
                fontSize: "4vh",
                color: "#FEFBF3",
                width: "400px"
              }}
            ></Typography>
          </div> */}
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          style={{ padding: 10 }}
          justify="space-between"
          alignItems="center"
          direction="column"
        >
          <div style={{ height: "20px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 300,
              maxWidth: 400,
            }}
          >
            <Grid container justify="center">
              {/* logo here */}
            </Grid>
            <Typography
              variant="h2"
              style={{
                fontFamily: ["Acme"].join(","),
                fontSize: "6",
                fontWeight: "500",
                color: "#22577A",
                marginBottom: "5%",
              }}
            >
              <a href="/auth/google">
                <Button variant="outlined">
                  <i class="fab fa-google"></i>
                </Button>
              </a>
              <hr />
              Sign in to Designare
            </Typography>
            <TextField
              label="Username"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <LockRounded />
                  </InputAdornment>
                ),
              }}
            />
            <div style={{ height: "20px" }}></div>
            <Button
              style={{ backgroundColor: "#22577A", color: "white" }}
              variant="contained"
            >
              Sign In
            </Button>
            <div style={{ height: "20px" }}></div>
            <Button
              color="info"
              style={{ textTransform: "none", color: "#22577A" }}
              variant=""
            >
              Want to Design ?
            </Button>
          </div>
          <Grid>
            <Grid item>
              <Button
                color="info"
                style={{ color: "#22577A" }}
                variant=""
              ></Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
