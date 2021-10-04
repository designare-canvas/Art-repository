import React from "react";
import "./footer.scss";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import {Link} from 'react-router-dom';

function Footer() {
  const useStyles = makeStyles((theme) => ({
    title: {
      fontFamily: "Allison",
      fontStyle: "cursive",
      fontSize: "2.6rem",
      color: "#FEFBF3",
      marginRight: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const dateToday = new Date();

  return (
    <div className="footer">
      <div className="top">
        <div className="logo">
          <Link to="/">
            <Typography
              variant="h2"
              className={classes.title}
              style={{
                fontFamily: "Allison",
                fontStyle: "cursive",
                fontSize: "7vh",
                marginTop:"0"
              }}
            >
              designare
            </Typography>
          </Link>
          <p className="tagline">
            Creative fuels design. Design fuels creativity. Be here for more. Are you in love with a creative? It’s never too early to show it. 
          </p>
          <div className="icons">
            <Link to="https://facebook.com/">
              <FacebookIcon />
            </Link>
            <Link to="https://twitter.com/">
              <TwitterIcon />
            </Link>
            <Link to="https://instagram.com/">
              <InstagramIcon />
            </Link>
          </div>
        </div>
        <div className="lists">
          <div className="designers">
            <h4>For designers</h4>
            <Link to="/">
              <p>Explore design work</p>
            </Link>
            <Link to="/">
              <p>Design blog</p>
            </Link>
            <Link to="/">
              <p>Code of conduct</p>
            </Link>
          </div>
          <div className="hire-designer">
            <h4>Hire designers</h4>
            <Link to="/">
              <p>Post a job opening</p>
            </Link>
            <Link to="/">
              <p>Post a freelance porject</p>
            </Link>
            <Link to="/">
              <p>Search for designers</p>
            </Link>
          </div>
          <div className="company">
            <h4>Company</h4>
            <Link to="/">
              <p>About</p>
            </Link>
            <Link to="/">
              <p>Testimonials</p>
            </Link>
            <Link to="/">
              <p>Support</p>
            </Link>
            <Link to="/">
              <p>Privacy policy</p>
            </Link>
            <Link to="/">
              <p>Terms of service</p>
            </Link>
          </div>
          <div className="directories">
            <h4>Directories</h4>
            <Link to="/">
              <p>Tags</p>
            </Link>
            <Link to="/">
              <p>Places</p>
            </Link>
          </div>
          <div className="design-resources">
            <h4>Design resources</h4>
            <Link to="/">
              <p>Freelancing</p>
            </Link>
            <Link to="/">
              <p>Design Hiring</p>
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <p style={{ color: "rgba(256,256,256,0.56)" }}>
        &#9400; &ensp; {dateToday.getFullYear()} Designare. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
