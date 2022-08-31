/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import StarRating from "../models/StarRating";
import img from "../assets/yellow-heart.png";
import img1 from "../assets/broken-heart.png";
import useGetDistance from "../utils/useGetDistance";

const Dashboard = () => {
  const [loggedIn, setLoggedin] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [pics, setPics] = useState([]);
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useHistory();
  const distance = useGetDistance();

  console.log("distance", distance);

  useEffect(() => {
    refreshToken();
    getUsers();
    getLoggedIn();
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
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users/info", {});
    setUsers(response.data);
    console.log("users", users);
  };

  const getLoggedIn = async () => {
    const response = await axios.get(
      `http://localhost:5000/user/${cookie.refreshToken}`,
      {}
    );
    setLoggedin(response.data);
  };

  const handleUserSelect = async (id) => {
    history.push(`/users/${id}`);
  };

  var merge = [...users, ...distance];
  console.log("merge", merge);

  if (users.length === 0)
    return (
      <div className="text-center">
        <a href={`http://localhost:3000/profile/${loggedIn.id}`}>
          Logged in as: {loggedIn.username}
        </a>
        <br />
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="">
      <div className="text-center">
        <a href={`http://localhost:3000/profile/${loggedIn.id}`}>
          Logged in as: {loggedIn.username}
        </a>
      </div>{" "}
      <br />
      {/* <div>

        <p>HERE</p>
        {merge.map((user) => (
          <div key={user.id}>
            <div className="text-center">
                {user.username}
              </div>
                {user.distance}

          </div>
        ))}
              
      </div> */}
      <div className="">
        {merge &&
          merge.map((user) => {
            if (user.profile_pic) {
              return (
                <div key={user.id} className="card mb-3">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        onClick={() => handleUserSelect(user.id)}
                        className="card-img"
                        src={user.profile_pic}
                        alt="Card cap"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {user.username}, {user.birthdate}
                        </h5>
                        <StarRating rating={5} /> <br />
                        <label>Distance</label>
                        <p className="card-text">{user.distance}</p>
                        <label>Gender</label>
                        <p className="card-text">{user.gender}</p>
                        <label>Bio</label>
                        <p className="card-text">{user.bio}</p>
                        <div className="like-container">
                          <img className="like" src={img} alt="Card cap" />
                          <img className="dislike" src={img1} alt="Card cap" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Dashboard;
