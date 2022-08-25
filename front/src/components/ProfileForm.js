import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import Gender from "../models/Gender";
import Tags from "../models/Tags";
import Cities from "../models/Cities";
import Age from "../models/Age";
import Orientation from "../models/Orientation";
import jwt_decode from "jwt-decode";
import "../App.css";

const ProfileForm = () => {
  const [loggedIn, setLoggedin] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  useEffect(() => {
    refreshToken();
    getLoggedIn();
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
    try {
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoggedin(response.data);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const profileFill = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/fill`, {
        birthdate: age,
        gender: gender,
        orientation: orientation,
        city: city,
        interests: interests,
        bio: bio,
      });
      history.push("/pictures");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  if (loggedIn && loggedIn.birthdate) {
    return <Redirect to={`/profile/${loggedIn.id}`} />;
  }
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={profileFill}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Complete profile</h3>
            <div className="form-group mt-3">
              <div className="form-group mt-3">
                <label>Age</label>
                <Age setAge={setAge} />
              </div>
              <br />
              <label>Gender</label>
              <Gender setGender={setGender} />
              <br />
              <label>Sexual orientation</label>
              <Orientation setOrientation={setOrientation} />
              <br />
              <label>City</label>
              <Cities setCity={setCity} />
              <br />
              <label>Interests</label>
              <div className="form-group mt-3">
                <Tags setInterests={setInterests} />
              </div>
              <br />
              <label>Bio</label>
              <div className="form-group mt-3">
                <input
                  className="form-control mt-1"
                  type="text"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button className="btn btn-outline-warning">Submit</button>
                <a href="http://localhost:3000/dashboard"> Skip</a>
              </div>
            </div>
            <p className="message">{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
