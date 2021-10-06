import React from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import facebook from "./facebook.png";
import google from "./search.png";
import "./Login.scss";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

// import Box from '@material-ui/core/Box';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
// import FilledInput from '@material-ui/core/FilledInput';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function Login() {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [selectedDate, handleDateChange] = React.useState(new Date());
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
  return (
    <div className="Register">
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
          style={{ backgroundColor: "" }}
          className="Grid_top_signup"
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
                  fontSize: "2.3rem",
                  fontWeight: "700",
                  color: "#22577A",
                }}
              >
                Sign Up with Designare
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
                      backgroundColor: "none",
                      border: "none",
                      marginRight: "15px",
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
              </div>
            </Grid>
            <hr className="divider" style={{ width: "100%" }}></hr>
            <div>
              <TextField
                required
                fullWidth
                id="standard-required"
                label="First Name"
                className="name"
                variant="standard"
              />
              <TextField
                required
                id="standard-required"
                label="Last Name"
                fullWidth
                className="name"
                variant="standard"
              />
            </div>
            <TextField label="Username" margin="none" />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
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
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
              <TextField label="Country" margin="none" />
              <TextField label="State" margin="none" />
              <TextField label="Pincode" margin="none" />
            </FormControl>

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
              Sign Up
            </Button>
            <div style={{ height: "20px" }}></div>
            <Typography
              variant="paragraph"
              className="bottom"
              style={{
                fontFamily: "Josefin Sans",
                fontSize: "1.3rem",
                fontWeight: "500",
                color: "black",
                marginBottom: "5%",
                textAlign: "center",
              }}
            >
              Already a Designer?
              <Link
                href="/Signin"
                style={{ color: "#22577A", marginLeft: "5px" }}
                underline="none"
              >
                Resume here Now
              </Link>
            </Typography>
          </div>
          <div style={{ height: "20px" }} />
        </Grid>
      </Grid>
    </div>
  );
}
