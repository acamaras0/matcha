import React from "react";
import { passwordReset } from "../service/user";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCookie } from "react-use-cookie";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const cookie = getCookie("refreshToken");
  const history = useHistory();

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await passwordReset(token, password, confirmPassword);
      if (res) {
        console.log(res)
        return setMessage(res.msg);
      }
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
        <form className="Auth-form" onSubmit={ResetPassword}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Reset Password</h3>
            <div className="form-group mt-3">
              <input
                className="form-control mt-1"
                autoComplete="off"
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
                autoComplete="off"
                type="password"
                placeholder="Confirm password..."
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-outline-dark"> Submit </button>
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
