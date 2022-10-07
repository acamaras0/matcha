import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";
import { getCookie } from "react-use-cookie";

const Register = () => {
  const [firstNameReg, setFirstNameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [message, setMessage] = useState("");
  const xsrfToken = getCookie("refreshToken");
  const history = useHistory();

  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  const Register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users", {
        firstName: firstNameReg,
        lastName: lastNameReg,
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
        confPassword: confirmPasswordReg,
      });
      setMessage(res.data.msg);
      setTimeout(() => {
        setMessage("");
      }, 4000);
      if (res.data.message === "success") {
        history.push("/");
      }
    } catch (error) {
      if (error.response) {
        console.log("error", error.response.data);
        setMessage(error.response.data.msg);
      }
    }
  };
  if (xsrfToken !== "") {
    history.push("/dashboard");
  }

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={Register}>
          <div className="Auth-form-content">
            <div className="logo1">
              <img className="logo" src={logo} alt="logo" />
            </div>
            <h3 className="Auth-form-title">Sign up</h3>
            <p className="info">
              *First name, last name and username have to be in between 2 - 10
              characters long
            </p>
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
              <div className="form-group mt-3"></div>
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
            <p className="info">
              *Password has to be at least 8 characters and contain at least one
              uppercase, one lowercase, one number and one special character
            </p>
            <br />
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-warning"> Register </button>
            </div>
            <br />
            <p className="error">{message}</p>
            <p className="text-right mt-2">Already have an account?</p>
            <a href="http://localhost:3000/">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
