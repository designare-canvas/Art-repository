import React from "react";
import TextField from '@mui/material/TextField';
import './viewPost.scss'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ViewPost() {
    const initTitle="Hello World!";
    const initDiscription="dkfjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjdfjkdljjjjjjjjjjjjjjjjfkjgggggggggllllllllllllllllllllllllllllllllllllllllllllllldddddddddddddddddddddddddddddddddddddddddddddllllljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj";
    const [title, setTitle] = React.useState(initTitle);

    const handleTitle = (event) => {
      setTitle(event.target.value);
    };
    const [discription, setDiscription] = React.useState(initDiscription);

    const handleDiscription = (event) => {
      setDiscription(event.target.value);
    };
    return (
        <div className="viewpostContainer">
        <div className="upperhead">
        <h1>Edit Post</h1>
        </div>
        {/* <div className="title"> */}
        <div className="postHeader">
        <div className="leftItems">
          <div>
            <img src="https://st2.depositphotos.com/1104517/11965/v/600/depositphotos_119659092-stock-illustration-male-avatar-profile-picture-vector.jpg" className="profileImg" alt="posts" />
          </div>
            <h2>Someone</h2>
          {/* <div className="postBody">
            
          </div> */}
        </div>
        </div>
        <div className="postbody">

        <TextField
        //   required
          id="outlined-required"
          label="Title"
          value={title}
          onChange={handleTitle}
        />
        <div className="postImg">
          <img src="https://play-lh.googleusercontent.com/FCzgw2YD80puDhwEAOsjYCZcbetxOu5CRx7VzEVJ0z1C_FjyHqOefGqkrijyLD_cHbx1" alt="posts" style={{width:"30vw", borderRadius:"10px",height:"30vw"}} />
           </div>
        
        <TextField
          id="outlined-multiline-flexible"
          label="Discription"
          multiline
          maxRows={4}
          value={discription}
          onChange={handleDiscription}
        //   size="large"
        //   width="50%"
        fullWidth
        />
         <Stack className="btnstack" spacing={3} direction="row">
      {/* <Button variant="text">Text</Button> */}
      <Button variant="contained" >Save</Button>
      <Button variant="contained" style={{backgroundColor: "#f0ad4e"}}>UnPublish</Button>
      <Button variant="contained" style={{backgroundColor: "#d9534f"}}>Delete</Button>
    </Stack>

        </div>
        </div>
    )
}
export default ViewPost;