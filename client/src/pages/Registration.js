import React, { useState } from "react";
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
  const [message, setMessage] = useState("");

  Axios.defaults.withCredentials = true;

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      firstName: firstNameReg,
      lastName: lastNameReg,
      username: usernameReg,
      email: emailReg,
      password: passwordReg,
      confPassword: confirmPasswordReg,
    }).then((response) => {
      if (response.data.error) {
        setMessage(response.data.error);
      } else if (response.data.message) {
        setStatus(response.data.message);
      }
    });
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={register}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              className="form-control mt-1"
              type="text"
              onChange={(e) => {
                setFirstNameReg(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              className="form-control mt-1"
              type="text"
              onChange={(e) => {
                setLastNameReg(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              type="text"
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
            <div className="form-group mt-3"></div>
            <label>Email address</label>
            <input
              className="form-control mt-1"
              type="email"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              className="form-control mt-1"
              type="password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm password</label>
            <input
              className="form-control mt-1"
              type="password"
              onChange={(e) => {
                setConfirmPasswordReg(e.target.value);
              }}
            />
          </div>
          <br />
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary">
              {" "}
              Register{" "}
            </button>
          </div>
          <p className="message">{status}</p>
          <p className="error">{message}</p>
          <p className="forgot-password text-right mt-2">
            Already have an account?
          </p>
            <a href="http://localhost:3000/login">Login</a>
        </div>
      </form>
    </div>
  );
}
