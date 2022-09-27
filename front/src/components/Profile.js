import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import PicturesForm from "./PicturesForm";
import { getCookie } from "react-use-cookie";
import Gender from "../models/Gender";
import Orientation from "../models/Orientation";
import Tags from "../models/Tags";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [pics, setPics] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newInterest, setNewInterest] = useState([]);
  const [newGender, setNewGender] = useState("");
  const [newOrientation, setNewOrientation] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newGeoLat, setNewGeoLat] = useState("");
  const [newGeoLng, setNewGeoLng] = useState("");
  const [message, setMessage] = useState("");
  const xsrfToken = getCookie("refreshToken");
  const history = useHistory();
  const [show, toggleShow] = useState(false);

  useEffect(() => {
    if (xsrfToken !== "") {
      const getLoggedIn = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/${xsrfToken}`,
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
  }, [id, xsrfToken]);


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
          interests: newInterest,
          gender: newGender,
          orientation: newOrientation,
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

  if (xsrfToken === "") {
    history.push("/");
  }
  if (user)
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
              <h3 onClick={() => toggleShow(!show)}>✍ Change Password</h3>{" "}
              <br />
              <form>
                <label>New Password</label>
                <input
                  type="password"
                  autoComplete="off"
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
                  autoComplete="off"
                  onChange={(e) => {
                    setNewPasswordConfirm(e.target.value);
                  }}
                ></input>
              </form>
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
              defaultValue={user.firstname}
              onSave={(value) => {
                if (value !== "") {
                  setNewFirstName(value);
                } else {
                  setNewFirstName(user.firstname);
                }
                console.log(value);
              }}
            />
            <label>✎ Last Name</label>
            <EditText
              name="textbox1"
              defaultValue={user.lastname}
              onSave={(value) => {
                if (value !== "") {
                  setNewLastName(value);
                } else {
                  setNewLastName(user.lastname);
                }
                console.log(value);
              }}
            />
            <div className="card-body">
              <label>✎ Username</label>
              <EditText
                name="textbox1"
                defaultValue={user.username}
                onSave={(value) => {
                  if (value !== "") {
                    setNewUsername(value);
                  } else {
                    setNewUsername(user.username);
                  }
                  console.log(value);
                }}
              />
              <label>Age</label>
              <p>{user.birthdate}</p>
              <label>Coordinates</label>
              <EditText
                name="textbox1"
                defaultValue="New latitude"
                onSave={(value) => {
                  if (value !== "") {
                    setNewGeoLat(value);
                  } else {
                    setNewGeoLat(user.geo_lat);
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
                    setNewGeoLng(user.geo_long);
                  }
                }}
              />
              <label>✎ Email address</label>
              <EditText
                name="textbox1"
                defaultValue={user.email}
                onSave={(value) => {
                  if (value !== "") {
                    setNewEmail(value);
                  } else {
                    setNewEmail(user.email);
                  }
                  console.log(value);
                }}
              />
              <label>✎ Gender</label>
              <Gender setGender={setNewGender} />
              <label>✎ Sexual orientation</label>
              <Orientation setOrientation={setNewOrientation} />
              <label>✎ Interests</label>
              <Tags setInterests={setNewInterest} />
              <label>✎ Bio</label>
              <EditTextarea
                name="textbox1"
                defaultValue={user.bio}
                onSave={(value) => {
                  if (value !== "") {
                    setNewBio(value);
                  } else {
                    setNewBio(user.bio);
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
