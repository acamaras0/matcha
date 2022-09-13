/* eslint-disable */
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import chat from "../assets/chat.png";
import notification from "../assets/notification.png";
import logout from "../assets/logout.png";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  const displayNotifications = ({ senderName, type }) => {
    let action;
    if (type === "like") {
      action = "liked you";
    } else if (type === "dislike") {
      action = "unliked you";
    } else if (type === "profile view") {
      action = "viewed your profile";
    }
    return <span className="notification" key={type}>{`${senderName} ${action}`}</span>;
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  // const Chat = () => {
  //   history.push("/chat");
  // };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const Dashboard = () => {
    history.push("/dashboard");
  };
  //console.log("socket", socket);

  console.log("notiffff", notifications);

  return (
    <>
      <nav
        className="navbar is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <div className="Nav-logo">
              <img onClick={Dashboard} src={logo} alt="logo" />
            </div>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={notification} className="iconImg" alt="notif" />
                    {notifications.length > 0 && (
                      <div className="counter"></div>
                    )}
                  </div>
                  <div className="icon" onClick={() => setOpen(!open)}>
                    <img
                      // onClick={Chat}
                      src={chat}
                      alt="chat"
                      className="iconImg"
                    />
                    <div className="counter"></div>
                  </div>
                  <div className="icon">
                    <img
                      onClick={Logout}
                      src={logout}
                      alt="logout"
                      className="iconImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotifications(n))}
          <button className="btn btn-warning" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
