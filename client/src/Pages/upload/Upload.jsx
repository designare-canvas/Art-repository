import React, { useState, useEffect, useContext } from "react";
import Cropper from "../../components/Cropper/Cropper";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { AuthContext } from "../../Context/Authcontext";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function Upload() {
  const [result, setResult] = useState(null);
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    Title: "",
    Description: "",
    Image: "",
    Tags:[],
    user:user,
  });
  let history = useHistory();

  useEffect(() => {
    setValues({...values, "Image": result});
    console.log(values);
  }, [result]);// eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (prop) => (event) => {
    if(prop === "Tags"){
      const Tags = event.target.value.split(' ',10);
      const uniqueTags = [...new Set(Tags)];

      setValues({...values,[prop]:uniqueTags});
      console.log(values);
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
      .post("http://localhost:8080/api/posts/upload", values, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    
      if(res){
        if(res.data.success)  history.push("/");
        else  alert(result.data.message);
      }
    console.log(res);
  };

  return (
    <div>
    <Navbar />
      <form onSubmit={handleSubmit}>
      <TextField
            fullWidth
              required
              label="Title"
              margin="normal"
              onChange={handleChange("Title")}
            />
             <TextField
            fullWidth
              required
              label="description"
              margin="normal"
              onChange={handleChange("Description")}
            />
        <Cropper result={result} setResult={setResult} />
        <TextField
            fullWidth
              label="Tags"
              margin="normal"
              onChange={handleChange("Tags")}
            />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
