/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory, useParams } from "react-router-dom";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import StarRating from "../models/StarRating";

const Profile = () => {
  const { id } = useParams();
  const [loggedIn, setLoggedin] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [pics, setPics] = useState([]);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newOrientation, setNewOrientation] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getLoggedIn();
    getPicsById();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        //console.log("token ",response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getLoggedIn = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoggedin(response.data);
  };

  const getPicsById = async () => {
    const response = await axiosJWT.get("http://localhost:5000/user/pictures", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPics(response.data);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/user/update/${id}`, {
        firstName: newFirstName.value,
        lastName: newLastName.value,
        username: newUsername.value,
        email: newEmail.value,
        bio: newBio.value,
        interests: newInterest.value,
        gender: newGender.value,
        orientation: newOrientation.value,
        city: newCity.value,
      });
      history.push(`/profile/${id}`);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  if (pics.length > 0)
    return (
      <div className="text-center">
        <h3>Edit your profile by clicking on the desired field.</h3>
        <br />
        <EditText
          className="text-center"
          name="textbox1"
          defaultValue={loggedIn.firstname}
          inputClassName="bg-success form-control"
          onSave={(value) => {
            if (value !== "") {
              setNewFirstName(value);
            } else {
              setNewFirstName(loggedIn.firstname);
            }
            console.log(value);
          }}
        />
        <EditText
          name="textbox1"
          defaultValue={loggedIn.lastname}
          inputClassName="bg-success form-control"
          onSave={(value) => {
            if (value !== "") {
              setNewLastName(value);
            } else {
              setNewLastName(loggedIn.lastname);
            }
            console.log(value);
          }}
        />
        <p>{loggedIn.birthdate}</p>
        <EditText
          name="textbox1"
          defaultValue={loggedIn.email}
          inputClassName="bg-success form-control"
          onSave={(value) => {
            if (value !== "") {
              setNewEmail(value);
            } else {
              setNewEmail(loggedIn.email);
            }
            console.log(value);
          }}
        />
        <StarRating rating={5} />
        <div className="card-profile">
          <img className="card-img-top" src={pics[0].pic_path} alt="Card cap" />
          <div className="card-body">
            <EditText
              name="textbox1"
              defaultValue={loggedIn.username}
              inputClassName="bg-success form-control"
              onSave={(value) => {
                if (value !== "") {
                  setNewUsername(value);
                } else {
                  setNewUsername(loggedIn.username);
                }
                console.log(value);
              }}
            />
            <label>Gender</label>
            <EditText
              name="textbox1"
              defaultValue={loggedIn.gender}
              inputClassName="bg-success form-control"
              onSave={(value) => {
                if (value !== "") {
                  setNewGender(value);
                } else {
                  setNewGender(loggedIn.gender);
                }
                console.log(value);
              }}
            />
            <label>Sexual orientation</label>
            <EditText
              name="textbox1"
              defaultValue={loggedIn.orientation}
              inputClassName="bg-success form-control"
              onSave={(value) => {
                if (value !== "") {
                  setNewOrientation(value);
                } else {
                  setNewOrientation(loggedIn.orientation);
                }
                console.log(value);
              }}
            />

            <label>Location</label>
            <EditText
              name="textbox1"
              defaultValue={loggedIn.city}
              inputClassName="bg-success form-control"
              onSave={(value) => {
                if (value !== "") {
                  setNewCity(value);
                } else {
                  setNewCity(loggedIn.city);
                }
                console.log(value);
              }}
            />
            <label>Interests</label>
            <EditText
              name="textbox1"
              defaultValue={loggedIn.interests}
              inputClassName="bg-success form-control"
              onSave={(value) => {
                if (value !== "") {
                  setNewInterest(value);
                } else {
                  setNewInterest(loggedIn.interests);
                }
                console.log(value);
              }}
            />
            <label>Bio</label>
            <EditTextarea
              name="textbox1"
              defaultValue={loggedIn.bio}
              inputClassName="bg-success form-control"
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
          <button className="btn btn-primary" onClick={updateProfile}>
            Update
          </button>
        </div>
      </div>
    );
  else return <div>Loading...</div>;
};

export default Profile;

{
  /* <h5 className="card-title">{loggedIn.username}</h5>
            <label>Age</label>
            <p className="card-text">{loggedIn.birthdate}</p>
            <label>Bio</label>
            <p className="card-text">{loggedIn.bio}</p>
            <label>Gender</label>
            <p className="card-text">{loggedIn.gender}</p>
            <label>Location</label>
            <p className="card-text">{loggedIn.city}</p>
            <label>Interests</label>
            <p className="card-text">{loggedIn.interests}</p> */
}
