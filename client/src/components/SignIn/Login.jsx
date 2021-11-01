import React, { useState, useContext, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
// import facebook from "./facebook.png";
// import google from "./search.png";
import "./Login.scss";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import { AuthContext } from "../../Context/Authcontext";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import axios from "axios";
// import Navbar from "../navbar/Navbar";
export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const { dispatch } = useContext(AuthContext);

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:8080/api/auth/user", { withCredentials: true })
      .catch((err) => console.log("Authentication Not done"));
    console.log(response);

    if (response && response.data.loggedIn) {
      console.log("User:", response.data.user);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
    }
  };

  useEffect(() => {
    fetchAuthUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // import Navbar from "../navbar/Navbar";

  axios.defaults.withCredentials = true;
  const [msg, setMsg] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("http://localhost:8080/api/auth/login", values, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    if (result) {
      if (result.data.success) window.location.reload();
      else setMsg(result.data.message);
    }
    console.log(result);
  };

  return (
    <div className="Login">
      {/* <Navbar /> */}
      <Grid
        container
        style={{
          minHeight: "100vh",
          maxWidth: "150vh",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          style={{ backgroundColor: "#22577A" }}
          className="Grid_top"
        >
          <Typography
            variant="h2"
            className="addOn"
            style={{
              fontFamily: "Allison",
              fontStyle: "cursive",
              fontSize: "18vh",
              color: "#152D35",
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            designare
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
          className="Grid_mid"
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
            <div
              style={{
                width: "auto",
                margin: "auto",
                color: "red",
                fontSize: "20px",
                marginBottom: "30px",
              }}
            >
              {msg}
            </div>
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
              {/* <div style={{ marginTop: "5%" }}>
                <a href="/auth/google">
                  <Button
                    style={{
                      display: "inline-block",
                      cursor: "pointer",
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "none",
                      border: "none",
                      marginRight: "5px",
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
                      backgroundColor: "none",
                      border: "none",
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
              </div> */}
            </Grid>
            {/* <hr className="divider" style={{ width: "100%" }}></hr> */}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Username"
                margin="normal"
                onChange={handleChange("username")}
              />
              <FormControl
                sx={{ m: 1, width: "25ch" }}
                variant="standard"
                fullWidth
              >
                <InputLabel required htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <div style={{ height: "20px" }}></div>
              {/* <TextField label="Username" margin="normal" onChange = {handleChange("username")} />
            <TextField label="Password" margin="normal" onChange = {handleChange("password")}/> */}
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
                type="submit"
                fullWidth
              >
                Sign In
              </Button>
            </form>
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
                href="/Signup"
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
