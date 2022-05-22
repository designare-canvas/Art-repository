import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles, useTheme, alpha } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';




// IMPORTING ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
// import ExploreIcon from "@material-ui/icons/Explore";
import BrushIcon from "@material-ui/icons/Brush";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Drawer from "@material-ui/core/Drawer";
import { AuthContext } from "../../Context/Authcontext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    display: "none",
    [theme.breakpoints.down(1001)]: {
      display: "block",
    },
  },
  title: {
    fontFamily: "Allison",
    fontStyle: "cursive",
    fontSize: "2.6rem",
    color: "#FEFBF3",
    marginRight: theme.spacing(2),
  },
  tab: {
    fontFamily: "Rajdhani",
    color: "#FEFBF3",
    fontSize: "1.1rem",
    textTransform: "none",
    fontWeight: 550,
    minWidth: 1,
  },
  tabs: {
    flexGrow: 1,
    display: "block",
    [theme.breakpoints.down(1001)]: {
      display: "none",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(3),
    width: "auto%",
    [theme.breakpoints.down(1001)]: {
      marginLeft: theme.spacing(0),
      width: "50%",
    },
    [theme.breakpoints.down(600)]: {
      marginLeft: theme.spacing(0),
      width: "50%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    fontFamily: "Rajdhani",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.down(1001)]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down(600)]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
      marginLeft: theme.spacing(3),
    },
  },
  auth: {
    display: "block",
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  innertab: {
    fontFamily: "Rajdhani",
    color: "#22577A",
    fontSize: "1.1rem",
    textTransform: "none",
    fontWeight: 550,
    minWidth: 1,
  },
  usage: {
    justifyContent: "space-between",
  },
}));

export default function ButtonAppBar() {

  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1001));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // axios.defaults.baseURL = 'http://localhost:8080';
  axios.defaults.baseURL = 'https://designare.herokuapp.com/';

  const handleLogout = async () => {
    console.log(document.cookie);

    const result = await axios.get("/api/auth/logout",{withCredentials:true}).catch(Err => console.log(Err));
    if(result.data.success){
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isAdmin");
      history.push("/");
      window.location.reload(); 
    }
  };
  const drawerWidth = "50%";
  const drawer = (
    <div>
      <>
        <div style={{ height: "20px" }} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon style={{ color: "#22577A" }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>

        <List>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <ListItem button key="Home">
              <ListItemIcon style={{ color: "#22577A" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          {/* <ListItem button key="Explore">
            <ListItemIcon style={{ color: "#22577A" }}>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItem> */}
          <ListItem button key="Designs">
            <ListItemIcon style={{ color: "#22577A" }}>
              <BrushIcon />
            </ListItemIcon>
            <ListItemText primary="Designs" />
          </ListItem>
          <Link to="/WhatsNew" style={{ textDecoration: "none", color: "black" }}>
          <ListItem button key="What'sNew">
            <ListItemIcon style={{ color: "#22577A" }}>
              <FiberNewIcon />
            </ListItemIcon>
            <ListItemText primary="What'sNew" />
          </ListItem>
          </Link>
          {user ? (
            <>
              <Link
                to={`/Profile/${user.username}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button key="Profile">
                  <ListItemIcon style={{ color: "#22577A" }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
              </Link>
              <Link
                to="/upload"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button key="Upload">
                  <ListItemIcon style={{ color: "#22577A" }}>
                  <CloudUploadIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload" />
                </ListItem>
              </Link>
                <ListItem button key="Signout">
                  <ListItemIcon style={{ color: "#22577A" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" onClick={handleLogout} />
                </ListItem>
            </>
          ) : (
            <>
              <Link
                to="/Signin"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button key="SignIn">
                  <ListItemIcon style={{ color: "#22577A" }}>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="SignIn" />
                </ListItem>
              </Link>
              <Link
                to="/Signup"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button key="SignUp">
                  <ListItemIcon style={{ color: "#22577A" }}>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary="SignUp" />
                </ListItem>
              </Link>
            </>
          )}

          {/* {["Home", "Explore ", "Designs", "WhatsNew", "SignIn", "SignUp"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon style={{ color: "#22577A" }}>
                  {index === 0 ? <HomeIcon /> : " "}
                  {index === 1 ? <ExploreIcon /> : " "}
                  {index === 2 ? <BrushIcon /> : " "}
                  {index === 3 ? <FiberNewIcon /> : " "}
                  {index === 4 ? <LoginIcon /> : " "}
                  {index === 5 ? <AccountBoxIcon /> : " "}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )} */}
        </List>
      </>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#22577A" }}>
        <Toolbar className={classes.usage}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Typography
              variant="h2"
              className={classes.title}
              style={{ paddingBottom: "13%", fontWeight: 500 }}
            >
              designare
            </Typography>
          </Link>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                // container={container}
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    display: "none",
                  },
                }}
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Tab label="Home" className={classes.tab} />
                </Link>

                {/* <Tab label="Explore" className={classes.tab} /> */}

                <Tab label="Designs" className={classes.tab} />
                <Link to="/WhatsNew" style={{ textDecoration: "none" }}>
                  <Tab label="What'sNew" className={classes.tab} />
                </Link>
              </Tabs>
              {/* <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div> */}
              {user ? (
                <div className={classes.auth}>
                    <Stack direction="row" spacing={0.5}>
                      <Link to={`/Profile/${user.username}`} >
                        <Avatar style={{ marginLeft:"15px" }} src={user.profileImgUrl}></Avatar>
                      </Link>
                      <Link to="/upload" style={{ textDecoration: "none" }}>
                        <Button  style={{ color: "#ff66a0" }} className={classes.tab} color="primary" variant="">
                          Upload
                        </Button>
                      </Link>
                      <Button
                    style={{ display: "inline-block" }}
                    onClick={handleLogout}
                    className={classes.tab}
                    color="primary"
                    variant=""
                  >
                    Logout
                  </Button>
                    </Stack>
                </div>
              ) : (
                <div className={classes.auth}>
                  <Link to="/Signin" style={{ textDecoration: "none" }}>
                    <Button className={classes.tab} color="primary" variant="">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/Signup" style={{ textDecoration: "none" }}>
                    <Button
                      style={{ color: "#ff66a0" }}
                      className={classes.tab}
                      color="primary"
                      variant=""
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
