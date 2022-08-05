import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const forgotPassword = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/forgotpassword", {
      email: email,
    }).then((response) => {
      if (response.data.message) {
        setStatus(response.data.message);
      } else {
        setStatus(response.data[0].email);
      }
    });
  };
  useEffect(() => {
    Axios.get("http://localhost:3001/forgotpassword").then((response) => {
      if (response.data.loggedIn === true) {
        setStatus(response.data.user[0].email);
        console.log('this is response data',response.data.user[0].email);
      }
    });
  }, []);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={forgotPassword}>
        <div className="Auth-form-content">
          <h1>{status}</h1>
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
          <button className="btn btn-primary"> Submit </button>
        </div><br/>
        <p className="forgot-password text-right mt-2">
          <a href="http://localhost:3000/forgotPassword"> Return to login</a>
        </p>
      </form>
    </div>
  );
}
