import React, { useState } from "react";
import { register } from "../service/auth";
import { useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import "../App.css";

const Register = () => {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [message, setMessage] = useState("");
  const cookie = getCookie("refreshToken");
  const history = useHistory();

  const Register = async (e) => {
    e.preventDefault();
    try {
      const res = await register(
        firstNameReg,
        lastNameReg,
        usernameReg,
        emailReg,
        passwordReg,
        confirmPasswordReg
      );
      setMessage(res.msg);
      if (res.message === "success") {
        history.push("/");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  if (cookie !== "") {
    history.push("/dashboard");
  }

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={Register}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title mt-4">Sign up</h3>
            <p className="forgot-password text-right mt-2">
              Do you already have an account?
            </p>
            <a href="http://localhost:3000/">Log in!</a>
            <div className="form-group mt-3">
              <input
                placeholder="First Name"
                autoComplete="off"
                className="form-control mt-1"
                type="text"
                onChange={(e) => {
                  setFirstNameReg(e.target.value);
                }}
              />
              <input
                placeholder="Last Name"
                autoComplete="off"
                className="form-control mt-1"
                type="text"
                onChange={(e) => {
                  setLastNameReg(e.target.value);
                }}
              />
            </div>
            <p className="info">
              *First name, last name and username have to be in between 2 - 10
              characters long
            </p>
            <div className="form-group mt-3">
              <input
                placeholder="Username"
                autoComplete="off"
                className="form-control mt-1"
                type="text"
                onChange={(e) => {
                  setUsernameReg(e.target.value);
                }}
              />
              <input
                placeholder="Email address"
                autoComplete="off"
                className="form-control mt-1"
                type="email"
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              />
            </div>
            <p className="info">
              *Password has to be at least 8 characters and contain at least one
              uppercase, one lowercase, one number and one special character
            </p>
            <div className="form-group mt-3">
              <input
                placeholder="Password"
                autoComplete="off"
                className="form-control mt-1"
                type="password"
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
              <input
                placeholder="Confirm Password"
                autoComplete="off"
                className="form-control mt-1"
                type="password"
                onChange={(e) => {
                  setConfirmPasswordReg(e.target.value);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-dark"> Register </button>
            </div>
            <br />
            <p className="error">{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
