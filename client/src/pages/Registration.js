import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function Registration() {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [status, setStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      firstName: firstNameReg,
      lastName: lastNameReg,
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
      confPassword: confirmPasswordReg,
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
      <div className="registration">
        <h1>Registration</h1>
        <label>First Name</label>
        <input
          type="text"
          onChange={(e) => {
            setFirstNameReg(e.target.value);
          }}
        />
        <label>Last Name</label>
        <input
          type="text"
          onChange={(e) => {
            setLastNameReg(e.target.value);
          }}
        />
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Email address</label>
        <input
          type="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>Confirm password</label>
        <input
          type="password"
          onChange={(e) => {
            setConfirmPasswordReg(e.target.value);
          }}
        /><br/>
        <button onClick={register}> Register </button>
        <h3>{status}</h3>
        <p>Already have an account?</p>
        <a href="http://localhost:3000/login">Login</a>
      </div>
    </div>
  );
}
