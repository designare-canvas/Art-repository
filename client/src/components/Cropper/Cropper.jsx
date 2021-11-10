import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./Cropper.scss";
import { Button } from "@material-ui/core";

function Cropper(props) {
  const [crop, setCrop] = useState({ aspect: 4 / 3 });
  const [src, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
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
              onChange={(newCrop) => setCrop(newCrop)}
              className="select-img"
            />
            <button onClick={getCroppedImg}>Crop</button>
          </div>
        )}
      </div>
      {!props.result ? (
        <label htmlFor="contained-button-file">
          Select image for upload
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            // required
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      ) : (
        <img src={props.result} alt="" />
      )}
    </div>
  );
}

export default Cropper;
