import React, { useState } from "react";
import Axios from "axios";
import Gender from "../components/Gender";
import Tags from "../components/Tags";
import Cities from "../components/Cities";
import Orientation from "../components/Orientation";
import "../App.css";

export default function ProfileForm() {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  Axios.defaults.withCredentials = true;

  const profileFill = () => {
    Axios.post("http://localhost:3001/completeprofile", {
      birthdate: birthdate,
      gender: gender,
      orientation: orientation,
      city: city,
      interests: interests,
      bio: bio,
    }).then((response) => {
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error);
      }
    });
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
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
              <button className="btn btn-primary" onClick={profileFill}>
                Submit
              </button>
              <p className="forgot-password text-right mt-2">
                <a href="http://localhost:3000/login">Skip</a>
              </p>
            </div>
          </div>
          <p className="forgot-password text-right mt-2">{message}</p>
        </div>
      </form>
    </div>
  );
}
