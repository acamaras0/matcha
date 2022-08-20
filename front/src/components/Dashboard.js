/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import img from "./file1660896899801.jpeg"; 

const Dashboard = () => {
  const [loggedIn, setLoggedin] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [pics, setPics] = useState([]);
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getUsers();
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

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };
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

  // console.log("here",pics[0].pic_path);
  return (
    <div className="container mt-5">
      <img src={img} alt="pic" width="100" height="100" />

      <h1>Logged in as: {loggedIn.username}</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Pic</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthdate</th>
            <th>Gender</th>
            <th>Sexual orientation</th>
            <th>City</th>
            <th>Online</th>
          </tr>
        </thead>

        <tbody>
          {/* {pics.map((pic, index) => (
            <tr key={index}>
              <td>
                <img src={pic.pic_path} alt="pic" width="100" height="100" />
             
              </td>
              </tr>
          ))} */}
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.birthdate}</td>
              <td>{user.gender}</td>
              <td>{user.orientation}</td>
              <td>{user.city}</td>
              <td>{user.online}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
