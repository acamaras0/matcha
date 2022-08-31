import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import useGetDistance from "../utils/useGetDistance";
import StarRating from "../models/StarRating";

const ProfileRandom = () => {
  const { id } = useParams();
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const history = useHistory();
  const distance = useGetDistance();

  useEffect(() => {
    refreshToken();

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setSelectedUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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

  //   const axiosJWT = axios.create();

  //   axiosJWT.interceptors.request.use(
  //     async (config) => {
  //       const currentDate = new Date();
  //       if (expire * 1000 < currentDate.getTime()) {
  //         const response = await axios.get("http://localhost:5000/token");
  //         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  //         setToken(response.data.accessToken);
  //         const decoded = jwt_decode(response.data.accessToken);
  //         setExpire(decoded.exp);
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );
  var userID = useParams().id;
  var location = { ...distance };
  if (location[userID - 1]){
    var getDistance = location[userID - 1].distance / 1000;
  }
  if (!selectedUser) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-center">
            {selectedUser.firstname} {selectedUser.lastname}
          </h2>
          <StarRating rating={3} />
          <div className="card-profile">
            <img
              className="card-img-top"
              src={selectedUser.profile_pic}
              alt="Card cap"
            />
            <div className="card-body">
              <h5 className="card-title">{selectedUser.username}</h5>
              <p className="card-text">{getDistance} km away</p>
              <label>Age</label>
              <p className="card-text">{selectedUser.birthdate}</p>
              <label>Bio</label>
              <p className="card-text">{selectedUser.bio}</p>
              <label>Gender</label>
              <p className="card-text">{selectedUser.gender}</p>
              <label>Interests</label>
              <p className="card-text">{selectedUser.interests}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileRandom;
