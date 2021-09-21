import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { makeStyles, useTheme , alpha } from "@material-ui/core/styles";
// import {Link } from "react-router-dom";

// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.down(1001)]: {
        display: 'block',
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
    fontFamily: 'Rajdhani',
    color: "#FEFBF3",
    fontSize: "1.1rem",
    textTransform: "none",
    fontWeight:550,
    minWidth: 1
  },
  tabs: {
    flexGrow: 1,
    display: 'block',
    [theme.breakpoints.down(1001)]: {
      display: 'none',
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
        marginLeft: theme.spacing(3),
        width: "auto%",
    [theme.breakpoints.down(1001)]: {
      marginLeft: theme.spacing(3),
        width: "50%",
    },
    [theme.breakpoints.down(600)]: {
      display:'none'
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
    fontFamily: 'Rajdhani'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.down(600)]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  auth:{
    display: 'block',
    [theme.breakpoints.down(600)]: {
      display: 'none',
    },
},
 innertab: {
    fontFamily: 'Rajdhani',
    color: "#22577A",
    fontSize: "1.1rem",
    textTransform: "none",
    fontWeight:550,
    minWidth: 1 
  },
  usage: {
        justifyContent:'space-between',
  }
}));

export default function ButtonAppBar() {
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const [value, setValue] = React.useState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1001));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#22577A" }}>
        <Toolbar className={classes.usage}>
          <Typography variant="h2" className={classes.title}>
            Designare
          </Typography>
          {isMobile ? (
            <>
                <div className={classes.search} >
                    <div className={classes.searchIcon}>
                    <SearchIcon  />
                    </div>
                        <InputBase 
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                        />
                </div>
                <IconButton
                        edge="end"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                        >
                        <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchor}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    KeepMountedtransformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={open}
                    >
                    <MenuItem
                    //   onClick={() => setAnchor(null)}
                    //   component={Link}
                    //   to="/"
                    >
                    <Typography className ={classes.innertab} variant="h6"> Home</Typography>
                    </MenuItem>
                    <MenuItem
                    //   onClick={() => setAnchor(null)}
                    //   component={Link}
                    //   to="/College"
                    >
                    <Typography className ={classes.innertab} variant="h6"> Explore </Typography>
                    </MenuItem>
                    <MenuItem
                    //   onClick={() => setAnchor(null)}
                    //   component={Link}
                    //   to="/About"
                    >
                    <Typography className ={classes.innertab} variant="h6"> Designs</Typography>
                    </MenuItem>
                    <MenuItem
                    //   onClick={() => setAnchor(null)}
                    //   component={Link}
                    //   to="/designs"
                    >
                    <Typography className ={classes.innertab} variant="h6"> What'sNew </Typography>
                    </MenuItem>
                    <MenuItem
                    //   onClick={() => setAnchor(null)}
                    //   component={Link}
                    //   to="/signup"
                    >
                    <Typography className ={classes.innertab} variant="h6"> Sign In </Typography>
                
                    </MenuItem>
                    <MenuItem
                    //   onClick={() => setAnchor(null)}
                    //   component={Link}
                    //   to="/signin"
                    >
                    <Typography className ={classes.innertab} variant="h6"> Sign Up </Typography>
                    </MenuItem>
                         
                </Menu>
            </>
          ):( 
            <>
              <Tabs
                className={classes.tabs}
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                style: {
                    display: "none"
                }
                }}
            >
            <Tab label="Home" onMouseEnter={(e) => { e.target.style.color = "#A1CEF7" }} onMouseLeave={(e)=>{
            e.target.style.color = "#FEFBF3" }} className={classes.tab} />
                  
            <Tab label="Explore" className={classes.tab} />
            <Tab label="Designs" className={classes.tab} />
            <Tab label="What'sNew" className={classes.tab} />
          </Tabs>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        <div className={classes.auth}>
         <Button className={classes.tab} color="primary" variant="">
            Sign In
          </Button>
          <Button
            style={{ color: "#B1FFFD" }}
            className={classes.tab}
            color="primary"
            variant=""
          >
            Sign Up
          </Button></div>
        </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
