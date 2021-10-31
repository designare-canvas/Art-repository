import React,{useContext, useEffect} from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import Link from "@material-ui/core/Link";
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
import { AuthContext } from "../../Context/Authcontext";
import axios from "axios";

export default function Login() {
  axios.defaults.withCredentials = true;
  const { dispatch } = useContext(AuthContext);

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:8080/api/auth/user", { withCredentials: true })
      .catch((err) => console.log("Authentication Not done"));

    if (response && response.data) {
      console.log("User:", response.data.user);
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
    }
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const [selectedDate, setDate] = React.useState(new Date());
  const [values, setValues] = React.useState({
    Fname: null,
    Lname: null,
    username: null,
    password: null,
    email: null,
    city: null,
    country: null,
    DOB: selectedDate.toISOString().split("T")[0],
    showPassword: false,
  });



  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    
  };

  // const handleDateChange = (event) => {
  //   setDate(event.target.value);
  // }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [msg,setMsg] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const keys = Object.keys(values);
    keys.forEach((key, index) => {
      if (values[key] === "") {
        console.log(`${key} is empty`);
     }
    });
    console.log(selectedDate.toISOString().split("T")[0]);
    setValues({
      ...values,
      DOB: selectedDate.toISOString().split("T")[0],
    });
    const result = await axios
      .post("http://localhost:8080/api/auth/signup", values, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    console.log(result);
    if (result) {
      if(result.data.success)
        window.location.reload();
      else
        setMsg(result.data.message);
    }
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
            <div
              style={{
                width:"auto",
                margin:"auto",
                color:"red",
                fontSize:"20px",
                marginBottom:"30px",
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
                  fontSize: "2.3rem",
                  fontWeight: "700",
                  color: "#22577A",
                }}
              >
                Sign Up with Designare
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
              </div> */}
            </Grid>
            {/* <hr className="divider" style={{ width: "100%" }}></hr> */}
            <form onSubmit = {handleSubmit} >
            <div>
              <TextField
                required
                fullWidth
                id="standard-required"
                label="First Name"
                className="name"
                variant="standard"
                onChange={handleChange("Fname")}
                
              />
              <TextField
                required
                id="standard-required"
                label="Last Name"
                fullWidth
                className="name"
                variant="standard"
                onChange={handleChange("Lname")}
              />
            </div>
            <TextField
              label="Email"
              required
              type = "email"
              onChange={handleChange("email")}
              margin="none"
              fullWidth
            />
            <TextField
              required
              label="Username"
              fullWidth
              margin="none"
              onChange={handleChange("username")}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard" fullWidth>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                required
                fullWidth
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
            </FormControl>
              <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <DatePicker
                  disableFuture
                  fullWidth
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={handleChange}
                />
              </MuiPickersUtilsProvider>
              <TextField
              fullWidth
                label="City"
                onChange={handleChange("city")}
                margin="none"
              />
              <TextField
              fullWidth
                label="Country"
                onChange={handleChange("country")}
                margin="none"
              />
              <div style={{ height: "20px" }}></div>
              <Button
              fullWidth
                style={{
                  backgroundColor: "#22577A",
                  textTransform: "none",
                  fontSize: "2.5vh",
                  color: "white",
                }}
                variant="contained"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
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
