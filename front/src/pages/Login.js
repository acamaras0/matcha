import React, { useState } from "react";
import { login } from "../service/auth";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [cookie] = useCookies(["refreshToken"]);
  const history = useHistory();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      setMessage(res.msg);
      if (res.accessToken) {
        history.push("/completeprofile");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };

  if (cookie.refreshToken) {
    history.push("/dashboard");
  }
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={Auth}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title mt-5">Sign in</h3>
            <p>Are you new around here?</p>
            <a href="http://localhost:3000/register">Create an account!</a>
            <div className="form-group mt-3">
              <input
                className="form-control mt-1"
                autoComplete="off"
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
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-outline-dark"> Login </button>
          </div>
          <br />
          <p className="error">{message}</p>
          <p className="text-right mt-2">
            Forgot
            <a href="http://localhost:3000/forgotpassword"> password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
