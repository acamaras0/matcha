import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import "../App.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const cookie = getCookie("refreshToken");
  const history = useHistory();

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

  if (cookie !== "") {
    history.push("/dashboard");
  }
  return (
    <div>
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
                req="true"
              />
            </div>
            <br />
            <button className="btn btn-outline-dark"> Submit </button>
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
