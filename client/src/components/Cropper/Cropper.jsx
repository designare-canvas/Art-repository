import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./Cropper.scss";
import cloud from './computing-cloud.png';
import { Button,Typography } from "@material-ui/core";
import "./Cropper.scss";

function Cropper(props) {
  const [crop, setCrop] = useState({ aspect: 4 / 3 });
  const [src, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
    
  };
  
  function getCroppedImg(e) {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    props.setResult(base64Image);
    console.log(base64Image);
    // console.log(props.result);
  }

  return (
    <div className="upload">
      <div>
        {src && (
          <div className="select-img-div">
            <ReactCrop
              src={src}
              onImageLoaded={setImage}
              crop={crop}
              onChange={(newCrop) => {
                // console.log(newCrop);
                setCrop(newCrop);
              }}
              className="select-img"

            />
            {!(crop.x === 0 && crop.y === 0) && <Button variant="contained"  onClick={getCroppedImg}>
            Crop
          </Button>}
            {/* <button onClick={getCroppedImg} > CROp</button> */}
    
          </div>
        )}
      </div>
      {!src ? (
        <div style={{ margin:"20%",textAlign:"center"}} >
        <label htmlFor="contained-button-file">
            <img src={cloud} alt="input-before"></img>
            <Typography
                variant="h3"
                className="heading"
                style={{
                  fontFamily: "Rajdhani",
                  fontSize: "1.5rem",
                  fontWeight: "550",
                  color: "#22577A",
                }}
            >
              Upload Designs here
                </Typography>
        <input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
          style={{ display:"none"}}
          // required
        />
        {/* */}
        </label>
        </div>
       
      ) : (
          <div style={{ margin: "5%", textAlign: "center" }} >
           <Typography
                variant="caption"
                className="paragraph"
                style={{
                  fontFamily: "Josefin Sans",
                  fontSize: "1.0rem",
                  fontWeight: "500",
                  color: "#22577A",
                }}
            >
              Cropped Design : {(crop.x === 0 && crop.y === 0) && "Select and Crop to get image here!"}
            </Typography>
            <br />
            <img src={props.result} alt="" />
            </div>
      )}
    </div>
  );
}

export default Cropper;
