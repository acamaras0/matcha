import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function ProfileForm() {
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const profileFill = () => {
    Axios.post("http://localhost:3001/profilefill", {
      birthdate: birthdate,
      gender: gender,
      orientation: orientation,
      city: city,
      interests: interests,
      bio: bio,
    }).then((response) => {
      if (response.data.message) {
        setStatus(response.data.message);
      } else {
        setStatus(response.data[0].username);
      }
    });
  };

  return (
    <div className="App">
      <h3>{status}</h3>
      <div className="registration">
        <h1>Profile info</h1>
        <label>Birthdate</label>
        <input
          type="date"
          onChange={(e) => {
            setBirthdate(e.target.value);
          }}
        />
        <label>Gender</label>
        <select
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Sexual orientation</label>
        <select
          onChange={(e) => {
            setOrientation(e.target.value);
          }}
        >
          <option value="hetero">Straight</option>
          <option value="gay">Gay</option>
          <option value="bi">Bisexual</option>
        </select>
        <label>City</label>
        <select
          onChange={(e) => {
            setCity(e.target.value);
          }}
        >
          <option value="Helsinki">Helsinki</option>
          <option value="Tampere">Tampere</option>
          <option value="Jyväskylä">Jyväskylä</option>
          <option value="Oulu">Oulu</option>
          <option value="Turku">Turku</option>
          <option value="Kuopio">Kuopio</option>
          <option value="Kouvola">Kouvola</option>
        </select>
        <label>Interests</label>
        <select
          multiple={true}
          onChange={(e) => {
            setInterests(e.target.value);
          }}
        >
          <option value="traveling">Traveling</option>
          <option value="cooking">Cooking</option>
          <option value="gaming">Gaming</option>
          <option value="reading">Reading</option>
          <option value="movies">Movies</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
        </select>
        <label>Bio</label>
        <input
          type="text"
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <br />
        <button onClick={profileFill}> Submit </button>
        <a href="http://localhost:3000/login">Return</a>
      </div>
    </div>
  );
}
