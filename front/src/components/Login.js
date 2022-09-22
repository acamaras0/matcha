/* eslint-disable */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";
import useGeoLocation from "../utils/useGeoLocation";
import { useCookies } from "react-cookie";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const location = useGeoLocation();
  const history = useHistory();

  // useEffect(() => {
  // const getLocation = () => {
  // if (!navigator.geolocation) {
  //   console.log("Geolocation is not supported by your browser");
  // } else {
  //   console.log("Locating...");
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       // console.log(null);
  //       console.log("Lat", position.coords.latitude);
  //       console.log("Long", position.coords.longitude);
  //     },
  //     () => {
  //       console.log("Unable to retrieve your location");
  //     }
  //   );
  // }
  //   const apiURL = "https://ipgeolocation.abstractapi.com/v1/";
  //   const apiKey = "d9ec8ec9f0cf4cd189ce3d419d103c2c";
  //   const getUserLocationFromAPI = async () => {
  //     try {
  //       const response = await axios.get(apiURL, { api_key: apiKey });
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log("Something went wrong getting Geolocation from API!");
  //     }
  //   };
  //   getUserLocationFromAPI();
  // }, []);

  const Auth = async (e) => {
    e.preventDefault();

    // const gps = await axios.get('https://geolocation-db.com/json/');
    // console.log(gps.data);
    const res = await axios.post("http://localhost:5000/login", {
      username: username,
      password: password,
      lat: location.coordinates.lat,
      lng: location.coordinates.lng,
    });
    setMessage(res.data.msg);
    if (res.data.accessToken) {
      history.push("/completeprofile");
    }
  };

  if (cookie.refreshToken) {
    history.push("/dashboard");
  }
  return (
    <div>
      <div className="logo1">
        <img className="logo" src={logo} alt="logo" />
      </div>
      {/* {location.loaded ? JSON.stringify(location) : "No permission."} */}
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={Auth}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign in</h3>
            <p className="forgot-password text-right mt-2">
              Are you new around here?
            </p>
            <a href="http://localhost:3000/register">Create an account!</a>
            <div className="form-group mt-3">
              <input
                className="form-control mt-1"
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <br />
            <button className="btn btn-outline-warning"> Login </button>
          </div>
          <br />
          <p className="error">{message}</p>
          <p className="forgot-password text-right mt-2">
            Forgot
            <a href="http://localhost:3000/forgotpassword"> password?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
