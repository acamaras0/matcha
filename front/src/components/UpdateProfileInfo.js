import React, { useState } from "react";
import { updateUserInfo } from "../service/update";
import { EditText, EditTextarea } from "react-edit-text";
import Age from "../utils/SetAge";
import Gender from "../utils/SetGender";
import Tags from "../utils/SetTags";
import Orientation from "../utils/SetOrientation";

const UpdateProfile = ({ user, id, setMessage, message }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newInterest, setNewInterest] = useState([]);
  const [newGender, setNewGender] = useState("");
  const [newOrientation, setNewOrientation] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newGeoLat, setNewGeoLat] = useState("");
  const [newGeoLng, setNewGeoLng] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newAge, setNewAge] = useState("");
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserInfo(
        id,
        newFirstName.value,
        newLastName.value,
        newUsername.value,
        newEmail.value,
        newBio.value,
        newInterest,
        newGender,
        newOrientation,
        newGeoLat.value,
        newGeoLng.value,
        newCity.value,
        newCountry.value,
        newAge
      );
      setMessage(response.msg);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.msg);
      }
    }
  };

  console.log(newOrientation);
  return (
    <div>
      <h3 className="mt-4">✍ Update Profile</h3>
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
          }}
        />
        <label>✎ Age</label>
        <p className="age">{user.birthdate}</p>
        <Age setAge={setNewAge} />
        <br />
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
        <label>✎ City</label>
        <EditText
          name="textbox1"
          defaultValue={user.city}
          onSave={(value) => {
            if (value !== "") {
              setNewCity(value);
            } else {
              setNewCity(user.city);
            }
          }}
        />
        <label>✎ Country</label>
        <EditText
          name="textbox1"
          defaultValue={user.country}
          onSave={(value) => {
            if (value !== "") {
              setNewCountry(value);
            } else {
              setNewCountry(user.country);
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
          }}
        />
      </div>
      {message ? <p className="error">{message}</p> : null}
      <button className="btn btn-dark" onClick={updateProfile}>
        Update
      </button>
    </div>
  );
};

export default UpdateProfile;
