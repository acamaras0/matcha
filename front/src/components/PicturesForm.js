import React from "react";
import axios from "axios";
import { useState} from "react";
import { useHistory } from "react-router-dom";

const PicturesForm = () => {
  const [file, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const history = useHistory();
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post("http://localhost:5000/upload", formData);
     history.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  const f = () => {
    setFile(null);
    setSelectedImage(null);
  };

  return (
    <div className="form-group text-center">
      <h2>Upload your profile picture</h2><br/>
      {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button className="btn btn-danger" onClick={f}>
            Remove
          </button>
        </div>
      )}
      <br />
      <input className="input-group mb-3" type="file" name="file" onChange={saveFile} />
      <button className="btn btn-warning" onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default PicturesForm;
