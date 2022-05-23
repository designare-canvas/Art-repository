import React, { useContext, useState, useEffect } from 'react';
import { Grid, TextField, Typography, Button } from '@material-ui/core';
import './form.scss';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import { AuthContext } from '../../../Context/Authcontext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function ProfileForm() {
  const [shake, setShake] = useState(false);
  const { user } = useContext(AuthContext);
  const [msg, setMsg] = React.useState('');
  const [selectedDate, setDate] = React.useState(new Date(user.dob));
  const [profileimg, setProfileImg] = useState(null);
  const [Coverimg, setCoverImg] = useState(user.coverImgUrl);
  const [values, setValues] = React.useState({
    profileImgUrl: user.profileimgurl,
    coverImgUrl: user.coverimgurl,
    user: user,
    Fname: user.fname,
    Lname: user.lname,
    email: user.email,
    city: user.city,
    country: user.country,
    DOB: selectedDate.toISOString().split('T')[0],
  });
  let history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const keys = Object.keys(values);
    keys.forEach((key, index) => {
      if (values[key] === '') {
        console.log(`${key} is empty`);
      }
    });
    // const base64Image = profileimg.toDataURL("image/jpeg");
    // console.log(base64Image)
    setValues({
      ...values,
      DOB: selectedDate.toISOString().split('T')[0],
    });
    console.log(values);
    const result = await axios
      .put(`/api/user/${user.username}`, values)
      .catch((err) => console.log(err));
    console.log(result);
    if (result) {
      if (result.data.success) {
        history.push(`/Profile/${user.username}`);
        window.location.reload();
      } else {
        setMsg(result.data.message);
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 1000);
        console.log(shake);
      }
    }
  };

  return (
    <div>
      <div className="profileform">
        <div style={{ textAlign: 'center' }}>
          <h1
            // className="heading"
            style={{
              margin: '30px',
              fontFamily: 'Josefin Sans',
              fontSize: '3rem',
              fontWeight: '700',
              color: '#22577A',
            }}
          >
            Edit Profile
          </h1>
        </div>

        <Grid
          container
          style={
            {
              // minHeight: "100vh",
              // maxWidth: "150vh",
            }
          }
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{ backgroundColor: '' }}
            className="Grid_top_signup"
          >
            <div>
              <div className="profileCover">
                <img className="profileCoverImg" src={user.coverimgurl} alt="" />
                <img className="profileUserImg" src={user.profileimgurl} alt="" />
              </div>
              <div style={{ height: '20px' }}></div>
              {/* <div style={{ textAlign: "center" }}>
                <Typography
                  variant="h2"
                  // className="heading"
                  style={{
                    fontFamily: "Josefin Sans",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#22577A",
                  }}
                >
                  Update Profile Image
                </Typography>

                <div>
                  <Button
                    style={{
                      backgroundColor: "#22577A",
                      textTransform: "none",
                      fontSize: "2vh",
                      color: "white",
                      marginRight: "40px",
                      marginTop: "10px",
                    }}
                    variant="contained"
                    component="label"
                    // className="btn"
                  >
                    Upload
                    <input
                      type="file"
                      hidden
                      onChange={(e) => this.onChange(e)}
                      // onImageLoaded={handleImg}
                      // onChange={handleChange("ProfileImg")}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    className="btn"
                    style={{
                      backgroundColor: "#df4759",
                      textTransform: "none",
                      fontSize: "2vh",
                      color: "white",
                      marginLeft: "40px",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </Button>
                </div>
                <Typography
                  variant="h2"
                  // className="heading"
                  style={{
                    fontFamily: "Josefin Sans",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#22577A",
                    marginTop: "20px",
                  }}
                >
                  Update Cover Image
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      backgroundColor: "#22577A",
                      textTransform: "none",
                      fontSize: "2vh",
                      color: "white",
                      marginRight: "40px",
                      marginTop: "10px",
                    }}
                  >
                    Upload
                    <input type="file" hidden onImageLoaded={setCoverImg} />
                  </Button>
                  <Button
                    variant="contained"
                    className="btn"
                    style={{
                      backgroundColor: "#df4759",
                      textTransform: "none",
                      fontSize: "2vh",
                      color: "white",
                      marginLeft: "40px",
                      marginTop: "10px",
                    }}
                  >
                    Delete
                  </Button>
                </div> */}
              {/* </div> */}
            </div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            style={{ padding: 10 }}
            justify="space-between"
            alignItems="center"
            direction="column"
          >
            <div style={{ height: '20px' }} />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                minWidth: 500,
                maxWidth: 500,
              }}
            >
              <Grid container justify="center" style={{ marginBottom: '5%' }}>
                <Typography
                  variant="h2"
                  // className="heading"
                  style={{
                    fontFamily: 'Josefin Sans',
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#22577A',
                  }}
                >
                  Update Profile Data
                </Typography>
              </Grid>
              {/* <hr  style={{ width: "100%" }}></hr> */}
              <div>
                <TextField
                  required
                  fullWidth
                  id="standard-required"
                  label="First Name"
                  className="name"
                  variant="standard"
                  value={values.Fname}
                  onChange={handleChange('Fname')}
                  style={{ marginTop: '10px' }}
                />
                <TextField
                  required
                  id="standard-required"
                  label="Last Name"
                  fullWidth
                  className="name"
                  variant="standard"
                  value={values.Lname}
                  onChange={handleChange('Lname')}
                  style={{ marginTop: '10px' }}
                />
              </div>
              {/* <TextField label="Username" margin="none" /> */}
              <FormControl
                sx={{ m: 1, width: '25ch' }}
                variant="standard"
                style={{ marginTop: '10px' }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Date of birth"
                    views={['year', 'month', 'date']}
                    value={selectedDate}
                    style={{ marginTop: '10px' }}
                    // value={values.DOB}
                    onChange={(e) => {
                      handleChange(e);
                      setDate(e);
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  label="City"
                  margin="none"
                  style={{ marginTop: '10px' }}
                  value={values.city}
                  onChange={handleChange('city')}
                />
                <TextField
                  label="Country"
                  margin="none"
                  style={{ marginTop: '10px' }}
                  value={values.country}
                  onChange={handleChange('country')}
                />
              </FormControl>

              <div style={{ height: '20px' }}></div>
              <Button
                style={{
                  backgroundColor: '#22577A',
                  textTransform: 'none',
                  fontSize: '2.5vh',
                  color: 'white',
                }}
                variant="contained"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <div style={{ height: '20px' }}></div>
            </div>
            <div style={{ height: '20px' }} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
