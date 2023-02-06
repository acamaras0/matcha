import React from "react";
import { uploadPicture } from "../service/user";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";

const PicturesForm = () => {
  const [file, setFile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const cookie = getCookie("refreshToken");
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
      await uploadPicture(formData);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  const f = () => {
    setFile(null);
    setSelectedImage(null);
  };

  if (cookie === "") {
    history.push("/");
  }
  return (
    <div className="form-group text-center">
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
      <input type="file" name="file" onChange={saveFile} />
      <button className="btn btn-dark" onClick={uploadFile}>
        Upload Picture
      </button>
    </div>
  );
};

export default PicturesForm;
