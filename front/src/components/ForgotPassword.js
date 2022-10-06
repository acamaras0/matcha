import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import "../App.css";
import logo from "../assets/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const xsrfToken = getCookie("refreshToken");
  const history = useHistory();

  setTimeout(() => {
    setMessage("");
  }, 2000);

  const forgotPassword = (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:5000/users/forgotpassword", {
        email: email,
      });
      history.push("/");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  if (xsrfToken!== "") {
    history.push("/dashboard");
  }
  return (
    <div>
      <div className="logo1">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={forgotPassword}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Password recovery</h3>
            <br />
            <div className="form-group mt-3">
              <input
                className="form-control mt-1"
                type="email"
                placeholder="Email..."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-outline-warning"> Submit </button>
          </div>
          <br />
          <p className="error">{message}</p>
          <p className="forgot-password text-right mt-2">
            <a href="http://localhost:3000/"> Return to login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
