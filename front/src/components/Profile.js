/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import img from "./file1660896899801.jpeg";
import StarRating from "../models/StarRating";

const Profile = () => {
  const [loggedIn, setLoggedin] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [pics, setPics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getLoggedIn();
    getPicsById();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        //console.log("token ",response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getLoggedIn = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLoggedin(response.data);
  };

  const getPicsById = async () => {
    const response = await axiosJWT.get("http://localhost:5000/user/pictures", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPics(response.data);
  };

  //   console.log("here",pics[0].pic_path);
  return (
    <div className="text-center">
      <h1 className="text-center">
        {loggedIn.firstname} {loggedIn.lastname}
      </h1>
      <StarRating rating={3} />
      <div className="card">
        <img className="card-img-top" src={img} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{loggedIn.username}</h5>
          <label>Age</label>
          <p classname="card-text">{loggedIn.birthdate}</p>
          <label>Bio</label>
          <p classname="card-text">{loggedIn.bio}</p>
          <label>Gender</label>
          <p classname="card-text">{loggedIn.gender}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
