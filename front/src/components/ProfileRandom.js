/* eslint-disable */
import useGetDistance from "../utils/useGetDistance";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import StarRating from "../models/StarRating";
import Gallery from "../models/Gallery";
import { useCookies } from "react-cookie";

const ProfileRandom = () => {
  const { id } = useParams();
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const [pics, setPics] = useState([]);
  const [likes, setLikes] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const history = useHistory();
  const distance = useGetDistance();
  const [cookie, setCookie] = useCookies(["refreshToken"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setSelectedUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const getPicPath = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/pictures/${id}`,
        {}
      );
      setPics(response.data);
    };
    getPicPath();

    const getLoggedIn = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/${cookie.refreshToken}`,
        {}
      );
      setLoggedIn(response.data.id);
    };
    getLoggedIn();

    const count = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/fame/${id}`
        );
        setLikes(response.data.fame);
      } catch (error) {
        console.log(error);
      }
    };
    count();
  }, [id, setSelectedUser, setLikes]);

  const block = async (id) => {
    try {
      await axios.post(`http://localhost:5000/block/${loggedIn}/${id}`, {});
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // var location = { ...distance };
  // if (location[id - 1]) {
  //   var getDistance = location[id - 1].distance / 1000;
  // }

  if (!cookie.refreshToken) {
    history.push("/");
  }
  if (!selectedUser && !distance) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-center">
            {selectedUser.firstname} {selectedUser.lastname}
          </h2>
          <p className="card-text">{selectedUser.username}</p>
          {/* <p className="text-center">
                About {distance && Math.round(distance[0].distance / 1000)} km away
              </p> */}
          <StarRating rating={likes} />
          <div className="card-img">
            <Gallery galleryImages={pics} />
          </div>
          <div style={{ margin: "10%" }}>
            <div className="card">
              <div className="card-body">
                <label>Age</label>
                <p className="card-text">{selectedUser.birthdate}</p>
                <label>Bio</label>
                <p className="card-text">{selectedUser.bio}</p>
                <label>Gender</label>
                <p className="card-text">{selectedUser.gender}</p>
                <label>Sexual Orientation</label>
                <p className="card-text">{selectedUser.orientation}</p>
                <label>Interests</label>
                <p className="card-text">{selectedUser.interests}</p>
              </div>
            </div>{" "}
            <br />
            <button
              onClick={() => block(selectedUser.id)}
              className="btn btn-danger"
            >
              Block
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileRandom;
