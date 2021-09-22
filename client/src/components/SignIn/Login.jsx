import React from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import facebook from "./facebook.png";
import google from "./search.png";
import "./Login.scss";

export default function Login() {
  return (
    <div className="Login">
      <Grid
        container
        style={{
          minHeight: "100vh",
          maxWidth: "150vh",
        }}
      >
        <Grid item xs={12} sm={6} style={{ backgroundColor: "#22577A" }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2970/2970785.png"
            className="main"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt="brand"
          />
          <Typography
            variant="h2"
            className="addOn"
            style={{
              fontFamily: "Allison",
              fontStyle: "cursive",
              fontSize: "12vh",
              color: "#152D35",
              textAlign: "center",
              margin: "0",
              visibility: "hidden",
            }}
          >
            Designare
          </Typography>
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
            <Grid container justify="center" style={{ marginBottom: "5%" }}>
              <Typography
                variant="h2"
                className="heading"
                style={{
                  fontFamily: "Josefin Sans",
                  fontSize: "2.75rem",
                  fontWeight: "700",
                  color: "#22577A",
                }}
              >
                Sign in to Designare
              </Typography>
              <div style={{ marginTop: "5%" }}>
                <a href="/auth/google">
                  <Button
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "#f5f5f5",
                      marginRight: "25px",
                    }}
                    variant="outlined"
                  >
                    <img
                      src={google}
                      style={{ fontSize: "35px", paddingTop: 10 }}
                      alt="google"
                    ></img>
                  </Button>
                </a>
                <a href="/auth/facebook">
                  <Button
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "#f5f5f5",
                    }}
                    variant="outlined"
                  >
                    <img
                      src={facebook}
                      style={{ fontSize: "35px", paddingTop: 10 }}
                      alt="facebook"
                    ></img>
                  </Button>
                </a>
              </div>
            </Grid>
            <hr className="divider" style={{ width: "100%" }}></hr>
            <TextField label="Username" margin="normal"/>
            <TextField label="Password" margin="normal"/>
            <Link
              href="#"
              style={{ color: "#22577A", fontFamily: "Josefin Sans" }}
              underline="none"
            >
              Forget Password ?
            </Link>
            <div style={{ height: "20px" }}></div>
            <Button
              style={{
                backgroundColor: "#22577A",
                textTransform: "none",
                fontSize: "2.5vh",
                color: "white",
              }}
              variant="contained"
            >
              Sign In
            </Button>
            <div style={{ height: "20px" }}></div>
            <Typography
              variant="paragraph"
              className="bottom"
              style={{
                fontFamily: "Josefin Sans",
                fontSize: "3vh",
                fontWeight: "500",
                color: "black",
                marginBottom: "5%",
                textAlign: "center",
              }}
            >
              Want to Design?
              <Link
                href="#"
                style={{ color: "#22577A", marginLeft: "5px" }}
                underline="none"
              >
                Join us Now
              </Link>
            </Typography>
          </div>
          <div style={{ height: "20px" }} />
        </Grid>
      </Grid>
    </div>
  );
}
