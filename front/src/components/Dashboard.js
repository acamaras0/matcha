/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import StarRating from "../models/StarRating";
import img from "../assets/yellow-heart.png";
import img1 from "../assets/broken-heart.png";
import useGetDistance from "../utils/useGetDistance";
import PopUp from "../models/PopUp";

const Dashboard = ({ socket, user }) => {
  const [loggedIn, setLoggedin] = useState("");
  const [sender, setSender] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const [liked, setLiked] = useState(false);
  const history = useHistory();
  const distance = useGetDistance();

  useEffect(() => {
    getLoggedIn();
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/users/info/${cookie.refreshToken}`,
      {}
    );
    setUsers(response.data);
  };

  const getLoggedIn = async () => {
    const response = await axios.get(
      `http://localhost:5000/user/${cookie.refreshToken}`,
      {}
    );
    setLoggedin(response.data.id);
    setSender(response.data.username);
  };
  const handleMessage = (text) => {
    socket.emit("sendText", {
      senderName: loggedIn,
      receiverName: id,
      text,
    });
  };

  const handleUserSelect = async (id) => {
    socket.emit("sendNotification", {
      senderName: sender,
      receiverName: id,
      type: "profile view",
    });
    history.push(`/users/${id}`);
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/like/${loggedIn}/${id}`,
        {}
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) {
        console.log("error", error.response.data);
      }
    }
    setLiked(true);
    socket.emit("sendNotification", {
      senderName: sender,
      receiverName: id,
      type: "like",
    });
  };

  const handleUnLike = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/unlike/${loggedIn}/${id}`
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) console.log("error", error.response.data);
    }
    setLiked(true);
    socket.emit("sendNotification", {
      senderName: sender,
      receiverName: id,
      type: "dislike",
    });
  };

  const handleReport = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/report/${loggedIn}/${id}`
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) console.log("error", error.response.data);
    }
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const f1 = (id) => {
    togglePopup();
    handleUnLike(id);
  };
  const f2 = (id) => {
    togglePopup();
    handleLike(id);
  };
  if (!cookie.refreshToken) {
    history.push("/");
  }
  if (distance) {
    distance.sort((a, b) => a.distance - b.distance);
  }

  if (users.length === 0)
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="">
      <br />
      <div className="">
        {distance &&
          // eslint-disable-next-line
          distance.map((user) => {
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
                          {user.username}, {user.birthdate}{" "}
                          {user.online === 1 ? (
                            <p className="online"></p>
                          ) : (
                            <p className="offline"></p>
                          )}
                        </h5>
                        <StarRating rating={user.fame} /> <br />
                        <p className="card-text">
                          About {Math.round(user.distance / 1000)} km away
                        </p>
                        <label>Gender</label>
                        <p className="card-text">{user.gender}</p>
                        <label>Bio</label>
                        <p className="card-text">{user.bio}</p>
                        <div className="container">
                          <div className="like-container">
                            <img
                              onClick={() => f2(user.id)}
                              className="like"
                              src={img}
                              alt="Card cap"
                            />
                          </div>
                          <div className="dislike-container">
                            <img
                              onClick={() => f1(user.id)}
                              className="dislike"
                              src={img1}
                              alt="Card cap"
                            />
                            {/* <div>
                              {isOpen && (
                                <PopUp
                                  content={
                                    <>
                                      <p className="message">{message}</p>
                                    </>
                                  }
                                  handleClose={togglePopup}
                                />
                              )}
                            </div> */}
                          </div>
                        </div>
                        <div className="text-center">
                          <a
                            onClick={() => handleReport(user.id)}
                            className="report"
                          >
                            Report fake account
                          </a>
                          <p className="report">Last seen {user.updatedAt.slice(-0, -14)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div>
        {isOpen && (
          <PopUp
            content={
              <>
                <p className="message">{message}</p>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
