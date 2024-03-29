import React from "react";
import { getCookie } from "react-use-cookie";
import { useHistory } from "react-router-dom";
import ProfilePic from "../components/UploadProfilePic";

const SetInitialProfilePicture = () => {
  const cookie = getCookie("refreshToken");
  const history = useHistory();

  if (cookie === "") {
    history.push("/");
  }
  return (
    <div className="text-center">
      <div className="upload-pic">
        <ProfilePic />
      </div>
      <label>*Having a profile picture is mandatory! 🥺</label>
    </div>
  );
};
export default SetInitialProfilePicture;
