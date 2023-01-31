import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import "react-edit-text/dist/index.css";
import PicturesForm from "../components/PicturesForm";
import ProfilePic from "../components/UploadProfilePic";
import Overview from "../components/Overview";
import EditPictures from "../components/DeletePictures";
import ChangePassword from "../components/ChangePassword";
import UpdateProfile from "../components/UpdateProfileInfo";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [pics, setPics] = useState([]);
  const cookie = getCookie("refreshToken");
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [changeProfilePicture, setChangeProfilePicture] = useState(false);
  const [editPhotos, showEditPhotos] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  if (message) {
    setTimeout(() => {
      setMessage("");
      setMessage2("");
    }, 2000);
  }

  useEffect(() => {
    if (cookie !== "") {
      const getLoggedIn = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/${cookie}`,
          {}
        );
        setUser(response.data);
      };
      getLoggedIn();
    }
    const getPicPath = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/pictures/${id}`,
        {}
      );
      setPics(response.data);
    };
    getPicPath();
    return () => {
      setPics({});
    };
  }, [id, cookie]);

  const handleShow = (number) => {
    if (number === 1) {
      setShow(!show);
      setChangeProfilePicture(false);
      setShowUpload(false);
      showEditPhotos(false);
      setShowUpdate(false);
    } else if (number === 2) {
      setShow(false);
      setChangeProfilePicture(!changeProfilePicture);
      setShowUpload(!showUpload);
      showEditPhotos(false);
      setShowUpdate(false);
    } else if (number === 3) {
      setShow(false);
      setChangeProfilePicture(false);
      setShowUpload(false);
      showEditPhotos(!editPhotos);
      setShowUpdate(false);
    } else if (number === 4) {
      setShow(false);
      setChangeProfilePicture(false);
      setShowUpload(false);
      showEditPhotos(false);
      setShowUpdate(!showUpdate);
    }
  };

  if (cookie === "") {
    return <Redirect to="/" />;
  }
  if (user)
    return (
      <div className="mt-5 text-center">
        <div className="update">
          <div className="btn-group btn-group-toggle">
            <button
              className="btn btn-outline-dark"
              onClick={() => handleShow(1)}
            >
              Change Password
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => handleShow(2)}
            >
              Upload Pictures
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => handleShow(3)}
            >
              Edit Pictures
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => handleShow(4)}
            >
              Update Profile
            </button>
          </div>
          <div>
            {showUpload ? <PicturesForm /> : null}
            {changeProfilePicture ? <ProfilePic /> : null}
            {editPhotos ? <EditPictures pics={pics} user={user} /> : null}
          </div>
          <div className="card-password">
            {show ? (
              <ChangePassword
                id={id}
                setMessage={setMessage}
                setMessage2={setMessage2}
              />
            ) : null}
            <p className="error">{message2}</p>
            <div>
              {showUpdate ? (
                <UpdateProfile
                  user={user}
                  id={id}
                  message={message}
                  setMessage={setMessage}
                />
              ) : null}
            </div>
          </div>
          <div className="view">
            {pics ? (
              <div className="card" style={{ width: "50rem" }}>
                <Overview pics={pics} user={user} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  return <div>Loading...</div>;
};

export default Profile;
