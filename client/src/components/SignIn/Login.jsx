import React, { useState, useContext, useEffect } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import "./Login.scss";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import { AuthContext } from "../../Context/Authcontext";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
    isAdmin: false,
  });
  const [shake, setShake] = useState(false);
  const [msg, setMsg] = useState(null);

  const { dispatch } = useContext(AuthContext);

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:8080/api/auth/user", { withCredentials: true })
      .catch((err) => console.log("Authentication Not done"));
    console.log(response);

    if (response && response.data.loggedIn) {
      console.log("User:", response.data.user);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.user,
        adminState: response.data.isAdmin,
      });
    }
  };

  useEffect(() => {
    fetchAuthUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (prop) => (event) => {
    if (prop === "isAdmin") {
      setValues({ ...values, [prop]: event.target.checked });
      return;
    }
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

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(values.isAdmin){
      const result = await axios
      .post("http://localhost:8080/api/auth/adminlogin", values, {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
  
      if (result) {
        if (result.data.success) window.location.reload();
        else {
          setMsg(result.data.message);
          setShake(true);
          setTimeout(() => {
            setShake(false);
          }, 1000);
          console.log(shake);
        }
      }
      console.log(result);
    }else{
      const result = await axios
      .post("http://localhost:8080/api/auth/login", values, {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
  
      if (result) {
        if (result.data.success) window.location.reload();
        else {
          setMsg(result.data.message);
          setShake(true);
          setTimeout(() => {
            setShake(false);
          }, 1000);
          console.log(shake);
        }
      }
      console.log(result);
    }
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
            <div className={`display-msg ${shake ? "shake" : ""}`}>{msg}</div>
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
             
            </Grid>
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
              <div>
                <Checkbox
                  onChange={handleChange("isAdmin")}
                  style={{ textAlign: "center" }}
                />
                <label
                  style={{
                    fontFamily: "Rajdhani",
                    fontSize: "1rem",
                    fontWeight: "550",
                    color: "#22577A",
                  }}
                >
                  Signin as Admin
                </label>
              </div>
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
