import React, { useState, useEffect, useContext, } from "react";
import { useLocation } from "react-router-dom";
// import Cropper from "../../components/Cropper/Cropper";
import { Button,TextField } from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../Context/Authcontext";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Checkbox from '@mui/material/Checkbox';
import Optiontwo from "./optiontwo";
// import {DropzoneArea} from 'material-ui-dropzone'
function Optionone(postdetails) {
  console.log(postdetails.postImgUrl);
  const [result, setResult] = useState(null);
  const { user , isAdmin} = useContext(AuthContext);
  const [values, setValues] = useState({
    Title: postdetails.postTitle,
    Description: postdetails.postDescription,
    Image: postdetails.postImgUrl,
    Tags:[],
    user: user,
    isAdmin:isAdmin,
    isPublished:0   
  });
  let history = useHistory();
  useEffect(() => {
    setResult(postdetails.postImgUrl);
    console.log(result);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setValues({...values, "Image": result});
    console.log(values);
  }, [result]);// eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (prop) => (event) => {
    if(prop === "Tags"){
      const Tags = event.target.value.split(' ',10);
      const uniqueTags = [...new Set(Tags)];
      setValues({...values,[prop]:uniqueTags});
      return;
    }
    if (prop === "isPublished") {
      setValues({ ...values, [prop]:(event.target.checked) ? 1 : 0});
      return;
    }
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!result){
      alert("Please select an image first!");
      return;
    }
    console.log(values);
    const res = await axios
      .put("http://localhost:8080/api/posts/post/"+postdetails.id, values, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    
      if(res){
        if(res.data.success)  history.push("/");
        else  alert(res.data.message);
      }
    console.log(res);
  };
  console.log(values);
  return (
    <div>
      <Navbar />
      <div style={{margin:"0% 25%" , textAlign:"center"}}>
      <form onSubmit={handleSubmit} style={{width:"100%"}}>
      <TextField
            fullWidth
              required
              label="Title"
              margin="normal"
              value={values["Title"]}
              onChange={handleChange("Title")}
            />
            <TextField
            fullWidth
            required
            label="Description"
            margin="normal"
            value={values["Description"]}
              onChange={handleChange("Description")}
          />
          <div style={{ borderWidth: "5px", borderStyle: "dashed" ,borderColor:"#22577A" }}>
            {/* <DropzoneArea /> */}
            <img src={values["Image"]} alt="previous" style={{width:"100%"}} />
            {/* <Cropper result= setResult={setResult} /> */}
          </div>
          <TextField
            fullWidth
            label="Add your tags"
            margin="normal"
            value={values["Tags"]}
            onChange={handleChange("Tags")}
          />
          <div style={{ margin: "2% 25%", textAlign: "center" }}>
            <div><Checkbox onChange={handleChange("isPublished")} />
            <label style = {{fontFamily:"Rajdhani",fontSize: "1rem",
                  fontWeight: "550",
                  color: "#22577A"}}>Publish Now</label></div>
            
            <Button type="submit" variant="contained" >Edit Design</Button>
            {/* <button type="submit">upload</button> */}
        </div>
        </form>
        </div>
    </div>
  );
}

function Upload(props) {
    const location = useLocation();
    const postdetails = (location.state);
    console.log(postdetails);
    if (postdetails) {
      return Optionone(postdetails);
    }
    else {
      return <Optiontwo />
    }
}

export default Upload;
