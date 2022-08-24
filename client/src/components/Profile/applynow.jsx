import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CategoryIcon from '@mui/icons-material/Category';
import axios from 'axios';
import { AuthContext } from '../../Context/Authcontext';

function ApplyNow() {
  const { user } = useContext(AuthContext);
  const [btnDisable, setBtnDisable] = React.useState(false);

  const postRequest = async () => {
    console.log(user);
    const result = await axios.post(
      '/api/admin/createReq',
      { user: user },
      { withCredentials: true },
    );
    console.log(result);
    if (result.data.success) {
      setBtnDisable(true);
      alert('Applied successfully for being an artist!');
    }
  };

  const checkApplyStatus = async () => {
    const result = await axios.get('/api/admin/requests', { withCredentials: true });

    if (result.data.success) {
      console.log(result.data);
      result.data.data.forEach((e) => {
        if (e.req.username === user.username) setBtnDisable(true);
      });
    } else alert(result.data.message);
  };

  useEffect(() => {
    checkApplyStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="applynow" style={{ textAlign: 'center', margin: '2vw', width: '20vm' }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <CategoryIcon style={{ fontSize: '100px', color: '#22577A' }} />
          <h3 style={{ fontSize: '25px', margin: '10px' }}>Upload your first shot</h3>
          <h3>Apply Now and Become a Artist</h3>
        </CardContent>

        <Button
          variant="contained"
          onClick={postRequest}
          style={{ marginBottom: '10px' }}
          disabled={btnDisable}
        >
          Apply Now
        </Button>
      </Card>
    </div>
  );
}
export default ApplyNow;
