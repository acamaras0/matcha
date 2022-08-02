import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import Gender from "../components/Gender";
import Tags from "../components/Tags";
import Cities from "../components/Cities";
import Orientation from "../components/Orientation";

export default function ProfileForm() {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");

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
        console.log(response.data.message);
      } else {
        console.log(response.data.error);
      }
    });
  };
  return (
    <div className="App">
      {/* <h3>{status}</h3> */}
      <div className="registration">
        <h1>Profile info</h1>
        <label>Birthdate</label>
        <input
          type="date"
          onChange={(e) => {
            setBirthdate(e.target.value);
          }}
        />
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
        <Tags setInterests={setInterests} />
        <br />
        <label>Bio</label>
        <input
          type="text"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <br />
        <button onClick={profileFill}> Submit </button> <br />
        <a href="http://localhost:3000/login">Return</a>
      </div>
    </div>
  );
}
