import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";
import { v4 as uuidv4 } from "uuid";
import { logout } from "../service/auth";
import { markAsRead, markAsSeen } from "../service/notifications";
import fetchNotifications from "../utils/fetchNotifications";
import logo from "../assets/logo.png";
import chat from "../assets/chat.png";
import notification from "../assets/notification.png";
import logOut from "../assets/logout.png";
import userLogo from "../assets/user.png";
import filter from "../assets/filter.png";
import "../App.css";

const NavBar = ({ socket, user }) => {
  const cookie = getCookie("refreshToken");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        setNotifications(data);
      });
      socket.on("getMessage", (data) => {
        setMessages(data);
      });
    }
    return () => {
      setNotifications({});
      setMessages({});
    };
  }, [socket, cookie, user.id]);

  useEffect(() => {
    if (cookie !== "" && user.id) {
      const interval = setInterval(
        () =>
          fetchNotifications(user.id, cookie, setNotifications, setMessages),
        2000
      );
      return () => clearInterval(interval);
    }
  }, [user, cookie]);

  const displayNotifications = ({ sender_name, senderName, type }) => {
    let action;
    if (type === "like") {
      action = "liked you";
    } else if (type === "unlike") {
      action = "unliked you";
    } else if (type === "profile view") {
      action = "viewed your profile";
    } else if (type === "match") {
      action = "liked you back! It's a match!";
    } else if (type === "matchy") {
      action = "matched with you! Text them now!";
    } else if (type === "message") {
      action = "sent you a new message!";
    }
    return (
      <p className="notif-line" key={uuidv4()}>{`${
        sender_name ? sender_name : senderName
      } ${action}`}</p>
    );
  };

  const handleRead = async () => {
    setNotifications([]);
    setOpen(false);
    if (user && user.length !== 0) {
      await markAsRead(user.id, cookie);
    }
  };

  const Chat = async () => {
    if (user && user.profile_pic) {
      setMessages([]);
      await markAsSeen(user.id, cookie);
      history.push(`/chat/${user.id}`);
    }
  };

  const MyProfile = () => {
    history.push(`/profile/${user.id}`);
  };

  const Logout = async () => {
    try {
      await logout();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const Dashboard = () => {
    if (user.profile_pic) {
      history.push("/dashboard");
    }
  };

  const Filter = () => {
    if (user.profile_pic) {
      history.push(`/filter/${user.id}`);
    }
  };

  return (
    <>
      {user ? (
        <div>
          <nav className="navbar navbar-light bg-transparent" role="navigation">
            <div className="Nav-logo">
              <img onClick={Dashboard} src={logo} className="logo" alt="logo" />
            </div>
            <div className="navbar-brand"></div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <div className="icon" onClick={MyProfile}>
                      <img
                        src={userLogo}
                        className="icon-profile"
                        alt="profile"
                      />
                    </div>
                    <div className="icon" onClick={Filter}>
                      <img
                        src={filter}
                        className="icon-profile"
                        alt="profile"
                      />
                    </div>
                    <div className="icon" onClick={() => setOpen(!open)}>
                      <img src={notification} className="iconImg" alt="notif" />
                      {notifications?.length > 0 && (
                        <div className="counter"></div>
                      )}
                      {open && (
                        <div className="notifications position-absolute display-grid">
                          {notifications.length > 0
                            ? notifications.map((n) => displayNotifications(n))
                            : null}
                          <button className="btn btn-dark" onClick={handleRead}>
                            Mark as read
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="icon">
                      <img
                        onClick={Chat}
                        src={chat}
                        alt="chat"
                        className="iconImg"
                      />
                      {messages?.length > 0 && <div className="counter"></div>}
                    </div>
                    <div className="icon">
                      <img
                        onClick={Logout}
                        src={logOut}
                        alt="logout"
                        className="iconImg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <>
          <nav
            className="nav-bar navbar-light bg-transparent"
            role="navigation"
          >
            <img src={logo} className="logo" alt="" />
          </nav>
        </>
      )}
    </>
  );
};

export default NavBar;
