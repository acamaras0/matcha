import React, { useState, useEffect } from "react";
import { fill, getLoggedIn } from "../service/auth";
import { useHistory, Redirect } from "react-router-dom";
import Gender from "../utils/SetGender";
import Tags from "../utils/SetTags";
import Age from "../utils/SetAge";
import Orientation from "../utils/SetOrientation";
import { getCookie } from "react-use-cookie";
import "../App.css";

const CompleteProfile = () => {
  const [loggedIn, setLoggedin] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [orientation, setOrientation] = useState("");
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();
  const cookie = getCookie("refreshToken");

  useEffect(() => {
    if (cookie !== "") {
      const getUser = async () => {
        const response = await getLoggedIn(cookie);
        setLoggedin(response);
      };
      getUser();
    }
  }, [history, cookie]);

  const profileFill = async (e) => {
    e.preventDefault();
    try {
      const res = fill(age,gender,orientation, interests, bio);
      if (res.msg) {
        return setMessage(res.msg);
      }
      console.log(res);
      history.push("/pictures");
    } catch (error) {
        setMessage(error.response.msg);
    }
  };

  if (cookie === "") {
    history.push("/");
  }
  if (loggedIn && loggedIn.birthdate) {
    return <Redirect to={"/dashboard"} />;
  }
  return (
    <div>
      <div className="Complete-form-container">
        <form className="Auth-form" onSubmit={profileFill}>
          <div className="Complete-form-content">
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
                <button className="btn btn-outline-dark">Submit</button>
              </div>
            </div>
            <p className="error">{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
