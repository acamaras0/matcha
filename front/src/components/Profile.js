/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import PicturesForm from "./PicturesForm";
import { useCookies } from "react-cookie";
//import useGetDistance from "../utils/useGetDistance";

const Profile = () => {
  const { id } = useParams();
  const [loggedIn, setLoggedin] = useState("");
  const [pics, setPics] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newOrientation, setNewOrientation] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newGeoLat, setNewGeoLat] = useState("");
  const [newGeoLng, setNewGeoLng] = useState("");
  const [message, setMessage] = useState("");
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useHistory();
  //const distance = useGetDistance();

  useEffect(() => {
    getLoggedIn();
    getPicPath();
  }, []);

  const getLoggedIn = async () => {
    const response = await axios.get(
      `http://localhost:5000/user/${cookie.refreshToken}`,
      {}
    );
    setLoggedin(response.data);
  };

  const getPicPath = async () => {
    const response = await axios.get(
      `http://localhost:5000/user/pictures/${id}`,
      {}
    );
    setPics(response.data);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/user/update/${id}`,
        {
          firstName: newFirstName.value,
          lastName: newLastName.value,
          username: newUsername.value,
          email: newEmail.value,
          bio: newBio.value,
          interests: newInterest.value,
          gender: newGender.value,
          orientation: newOrientation.value,
          password: newPassword.value,
          passwordConfirm: newPasswordConfirm.value,
          geoLat: newGeoLat.value,
          geoLng: newGeoLng.value,
        }
      );
      setMessage(response.data.msg);
      history.push(`/profile/${id}`);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  const deletePic = async (pic_id) => {
    //console.log("pic_id", pic_id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/user/picture/${pic_id}`
      );
      history.push(`/profile/${id}`);
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/user/updatePassword/${id}`,
        {
          password: newPassword,
          passwordConfirm: newPasswordConfirm,
        }
      );
      setMessage(response.data.msg);
      history.push(`/profile/${id}`);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };
  if (!cookie.refreshToken) {
    history.push("/");
  }
  if (loggedIn)
    return (
      <div className="text-center">
        {message ? <p className="error">{message}</p> : null}
        <div className="update">
          <div className="card-pictures">
            <div className="uploaded-pics">
              {pics &&
                pics.map((pic) => (
                  <div className="images" key={pic.id}>
                    <img className="img-top" src={pic.img} alt="uploaded-pic" />
                    <div className="delete-button">
                      <button
                        className="btn btn-danger"
                        onClick={() => deletePic(pic.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <PicturesForm />
          </div>
          <div className="card-password">
            <div className="card-body">
              <h3>✍ Change Password</h3> <br />
              <label>New Password</label>
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Password..."
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              ></input>
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Confirm password..."
                onChange={(e) => {
                  setNewPasswordConfirm(e.target.value);
                }}
              ></input>
            </div>{" "}
            <br />
            <button onClick={updatePassword} className="btn btn-warning">
              Submit
            </button>
          </div>
          <div className="card-profile">
            <h3>✍ Update profile</h3>
            <br />
            <label>✎ Firts name</label>
            <EditText
              name="textbox1"
              defaultValue={loggedIn.firstname}
              onSave={(value) => {
                if (value !== "") {
                  setNewFirstName(value);
                } else {
                  setNewFirstName(loggedIn.firstname);
                }
                console.log(value);
              }}
            />
            <label>✎ Last Name</label>
            <EditText
              name="textbox1"
              defaultValue={loggedIn.lastname}
              onSave={(value) => {
                if (value !== "") {
                  setNewLastName(value);
                } else {
                  setNewLastName(loggedIn.lastname);
                }
                console.log(value);
              }}
            />
            <label>Age</label>
            <p>{loggedIn.birthdate}</p>
            <label>Coordinates</label>
            <EditText
              name="textbox1"
              defaultValue="New longitude"
              onSave={(value) => {
                if (value !== "") {
                  setNewGeoLat(value);
                } else {
                  setNewGeoLat(loggedIn.geo_lat);
                }
              }}
            />
            <EditText
              name="textbox1"
              defaultValue="New longitude"
              onSave={(value) => {
                if (value !== "") {
                  setNewGeoLng(value);
                } else {
                  setNewGeoLng(loggedIn.geo_long);
                }
              }}
            />
            <label>✎ Email address</label>
            <EditText
              name="textbox1"
              defaultValue={loggedIn.email}
              onSave={(value) => {
                if (value !== "") {
                  setNewEmail(value);
                } else {
                  setNewEmail(loggedIn.email);
                }
                console.log(value);
              }}
            />
            <div className="card-body">
              <label>✎ Username</label>
              <EditText
                name="textbox1"
                defaultValue={loggedIn.username}
                onSave={(value) => {
                  if (value !== "") {
                    setNewUsername(value);
                  } else {
                    setNewUsername(loggedIn.username);
                  }
                  console.log(value);
                }}
              />
              <label>✎ Gender</label>
              <EditText
                name="textbox1"
                defaultValue={loggedIn.gender}
                onSave={(value) => {
                  if (value !== "") {
                    setNewGender(value);
                  } else {
                    setNewGender(loggedIn.gender);
                  }
                  console.log(value);
                }}
              />
              <label>✎ Sexual orientation</label>
              <EditText
                name="textbox1"
                defaultValue={loggedIn.orientation}
                onSave={(value) => {
                  if (value !== "") {
                    setNewOrientation(value);
                  } else {
                    setNewOrientation(loggedIn.orientation);
                  }
                  console.log(value);
                }}
              />
              <label>✎ Interests</label>
              <EditText
                name="textbox1"
                defaultValue={loggedIn.interests}
                onSave={(value) => {
                  if (value !== "") {
                    setNewInterest(value);
                  } else {
                    setNewInterest(loggedIn.interests);
                  }
                  console.log(value);
                }}
              />
              <label>✎ Bio</label>
              <EditTextarea
                name="textbox1"
                defaultValue={loggedIn.bio}
                onSave={(value) => {
                  if (value !== "") {
                    setNewBio(value);
                  } else {
                    setNewBio(loggedIn.bio);
                  }
                  console.log(value);
                }}
              />
            </div>
            <button className="btn btn-warning" onClick={updateProfile}>
              Update
            </button>
          </div>
        </div>
      </div>
    );
  return <div>Loading...</div>;
};

export default Profile;
