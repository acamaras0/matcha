/* eslint-disable */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import logo from "../assets/logo.png";
const Activation = () => {
  const hash = useParams().hash;
  const history = useNavigate();
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const [message, setMessage] = useState("");

  const activate = async () => {
    try {
      const respose = await axios.post(
        `http://localhost:5000/activate/${hash}`
      );
      setMessage(respose.data.message);
      history("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  if (cookie.refreshToken) {
    history("/dashboard");
  }
  return (
    <>
      <div className="text-center">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="activ">
        <div className=" text-center">
          <div>
            <h3>Welcome to Matcha!</h3>
            <p>Click the following button for one last check!</p>
          </div>
          <button onClick={activate} className="btn btn-warning">
            Activate
          </button>
          <p className="error">{message}</p>
        </div>
      </div>
    </>
  );
};

export default Activation;
