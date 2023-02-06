import React, { useState } from "react";
import { forgottenPassword } from "../service/user";
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
      forgottenPassword(email);
      history.push("/");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.msg);
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
            <h3 className="Auth-form-title mt-5">Password recovery</h3>
            <p>Don't worry, we got you!</p>
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
