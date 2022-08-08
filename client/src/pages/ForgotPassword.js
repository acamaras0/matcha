import React, { useState } from "react";
import Nav from "../components/Nav";
import Axios from "axios";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  Axios.defaults.withCredentials = true;

  const forgotPassword = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/forgotpassword", {
      email: email,
    }).then((response) => {
      if (response.data.message) {
        setStatus(response.data.message);
      } else {
        setMessage(response.data.error);
      }
    });
  };

  return (
    <div>
      <Nav />
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
        <p className="message">{status}</p>
        <p className="error">{message}</p>
        <p className="forgot-password text-right mt-2">
          <a href="http://localhost:3000/login"> Return to login</a>
        </p>
      </form>
    </div>
    </div>
  );
}
