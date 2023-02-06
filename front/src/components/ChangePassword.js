import React, { useState } from "react";
import { updatePassword } from "../service/update";

const ChangePassword = ({ id, setMessage, setMessage2 }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const updatePass = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePassword(
        id,
        newPassword,
        newPasswordConfirm
      );
      setMessage2(response.msg);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.msg);
      }
    }
  };

  return (
    <>
      <form className="mt-3">
        <label>New Password</label>
        <input
          type="password"
          autoComplete="off"
          className="form-control mt-3"
          placeholder="Password..."
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        ></input>
        <label>Confirm Password</label>
        <input
          type="password"
          className="form-control mt-3"
          placeholder="Confirm password..."
          autoComplete="off"
          onChange={(e) => {
            setNewPasswordConfirm(e.target.value);
          }}
        ></input>
      </form>
      <button onClick={updatePass} className="btn btn-dark">
        Submit
      </button>
    </>
  );
};
export default ChangePassword;
