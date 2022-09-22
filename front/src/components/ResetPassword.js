/* eslint-disable */
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCookies } from "react-cookie";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useNavigate();

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/resetpassword/${token}`, {
        password: password,
        confPassword: confirmPassword,
        token: token,
      });
      history("/");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  if (cookie.refreshToken) {
    history("/dashboard");
  }
  return (
    <div>
      <div className="logo1">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={ResetPassword}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Reset Password</h3>
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
            <div className="form-group mt-3">
              <input
                className="form-control mt-1"
                type="password"
                placeholder="Confirm password..."
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-outline-warning"> Submit </button>
          </div>
          <br />
          <p className="error">{message}</p>
          <p className="forgot-password text-right mt-2">
            <a href="http://localhost:3000/">Return</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
