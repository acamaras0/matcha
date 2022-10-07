import React from "react";
import { getCookie } from "react-use-cookie";
import { useHistory } from "react-router-dom";
import ProfilePic from "./ProfilePic";

const UploadPic = () => {
  const xsrfToken = getCookie("refreshToken");
  const history = useHistory();

  if (xsrfToken === "") {
    history.push("/");
  }
  return (
    <div className="text-center">
      <label>Having a profile picture is mandatory! 🥺</label>
      <div className="upload-pic">
        <ProfilePic />
      </div>
    </div>
  );
};
export default UploadPic;
