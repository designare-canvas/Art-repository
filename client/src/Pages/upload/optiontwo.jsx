import React, { useState, useEffect, useContext } from 'react';
import Cropper from '../../components/Cropper/Cropper';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from '../../Context/Authcontext';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Checkbox from '@mui/material/Checkbox';
function Optiontwo() {
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    Title: '',
    Description: '',
    Image: '',
    Tags: [],
    user: user,
    isPublished: 0,
  });
  let history = useHistory();
  useEffect(() => {
    setValues({ ...values, Image: result });
    console.log(values);
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (prop) => (event) => {
    if (prop === 'Tags') {
      const Tags = event.target.value.split(' ', 10);
      const uniqueTags = [...new Set(Tags)];

      setValues({ ...values, [prop]: uniqueTags });
      console.log(values);
      return;
    }
    if (prop === 'isPublished') {
      setValues({ ...values, [prop]: event.target.checked === true ? 1 : 0 });

      return;
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!result) {
      alert('Please select an image first!');
      return;
    }
    console.log(values);
    const res = await axios
      .post('/api/posts/art', values, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    if (res) {
      if (res.data.success) history.push('/');
      else alert(res.data.message);
    }
    console.log(res);
  };

  return (
    <div>
      <Navbar />
      <div style={{ margin: '0% 25%', textAlign: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            required
            label="Title"
            margin="normal"
            // value={(postdetails.postTitle) ? values["Title"] : values.Title}
            onChange={handleChange('Title')}
          />
          <TextField
            fullWidth
            required
            label="Description"
            margin="normal"
            onChange={handleChange('Description')}
          />
          <div
            style={{
              borderWidth: '5px',
              borderStyle: 'dashed',
              borderColor: '#22577A',
            }}
          >
            {/* <DropzoneArea /> */}
            <Cropper result={result} setResult={setResult} />
          </div>
          <TextField
            fullWidth
            label="Add your tags"
            margin="normal"
            onChange={handleChange('Tags')}
          />
          <div style={{ margin: '2% 25%', textAlign: 'center' }}>
            <div>
              <Checkbox onChange={handleChange('isPublished')} />
              <label
                style={{
                  fontFamily: 'Rajdhani',
                  fontSize: '1rem',
                  fontWeight: '550',
                  color: '#22577A',
                }}
              >
                Publish Now
              </label>
            </div>

            <Button type="submit" variant="contained">
              Upload Design
            </Button>
            {/* <button type="submit">upload</button> */}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Optiontwo;
