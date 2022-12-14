import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";

const ProfilePic = () => {
  const [file, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const xsrfToken = getCookie("refreshToken");
  const history = useHistory();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  };
  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", file);
    try {
      await axios.post("http://localhost:5000/upload/profilePic", formData);
      if (file) {
        history.push("/dashboard");
      } else setMessage("Please choose a picture!");
    } catch (err) {
      console.log(err);
    }
  };
  const f = () => {
    setFile(null);
    setSelectedImage(null);
  };

  if (xsrfToken === "") {
    history.push("/");
  }
  return (
    <div className="form-group text-center">
      <h3>✍ Change Profile Picture</h3>
      <p className="error">{message}</p>
      <br />
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
      <input className="" type="file" name="file" onChange={saveFile} />
      <button className="btn btn-warning" onClick={uploadFile}>
        Upload
      </button>
    </div>
  );
};

export default ProfilePic;
