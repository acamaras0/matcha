import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import "../App.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        username: username,
        password: password,
      });
      history.push("/completeprofile");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={Auth}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign in</h3>
            <p className="forgot-password text-right mt-2">
              Are you new around here?
            </p>
            <a href="http://localhost:3000/register">Create an account!</a>
            <div className="form-group mt-3">
              <input
                className="form-control mt-1"
                type="text"
                placeholder="Username..."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="form-group mt-3">
              <input
                className="form-control mt-1"
                type="password"
                placeholder="Password..."
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-outline-warning"> Login </button>
          </div>
          <br />
          <p className="error">{message}</p>
          <p className="forgot-password text-right mt-2">
            Forgot
            <a href="http://localhost:3000/forgotpassword"> password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
