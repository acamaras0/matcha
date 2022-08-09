import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Gender from "../models/Gender";
import Tags from "../models/Tags";
import Cities from "../models/Cities";
import Orientation from "../models/Orientation";
import "../App.css";

const ProfileForm = () => {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const profileFill = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/fill", {
        birthdate: birthdate,
        gender: gender,
        orientation: orientation,
        city: city,
        interests: interests,
        bio: bio,
      });
      history.push("/dashboard");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={profileFill}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Complete profile</h3>
            <div className="form-group mt-3">
              <label>Birthdate</label>
              <div className="form-group mt-3">
                <input
                  type="date"
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                  }}
                />
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
                <p className="forgot-password text-right mt-2">
                  <a href="http://localhost:3000/login">Skip</a>
                </p>
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
