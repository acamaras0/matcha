import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";
import { v4 as uuidv4 } from "uuid";
import fetchNotifications from "../utils/fetchNotifications";
import logo from "../assets/logo.png";
import chat from "../assets/chat.png";
import notification from "../assets/notification.png";
import logout from "../assets/logout.png";
import user from "../assets/user.png";
import filter from "../assets/filter.png";

const NavBar = ({ socket }) => {
  const cookie = getCookie("refreshToken");
  const [loggedIn, setLoggedin] = useState("");
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
    if (cookie !== "") {
      const getLoggedIn = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/${cookie}`,
          {}
        );
        setLoggedin(response.data);
      };
      getLoggedIn();
    }

    return () => {
      setNotifications({});
      setMessages({});
    };
  }, [socket, cookie, loggedIn.id]);

  useEffect(() => {
    if (cookie !== "" && loggedIn.id) {
      const interval = setInterval(
        () =>
          fetchNotifications(
            loggedIn.id,
            cookie,
            setNotifications,
            setMessages
          ),
        2000
      );
      return () => clearInterval(interval);
    }
  }, [loggedIn, cookie]);

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
    if (loggedIn && loggedIn.length !== 0) {
      await axios.post(`http://localhost:5000/user/mark/${loggedIn.id}`);
    }
  };

  const Chat = async () => {
    if (loggedIn && loggedIn.profile_pic) {
      setMessages([]);
      await axios.post(`http://localhost:5000/messages/seen/${loggedIn.id}`);
      history.push(`/chat/${loggedIn.id}`);
    }
  };

  const MyProfile = () => {
    history.push(`/profile/${loggedIn.id}`);
  };

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const Dashboard = () => {
    if (loggedIn.profile_pic) {
      history.push("/dashboard");
    }
  };

  const Filter = () => {
    if (loggedIn.profile_pic) {
      history.push(`/filter/${loggedIn.id}`);
    }
  };

  const Register = () => {
    history.push("/register");
  };

  const Login = () => {
    history.push("/");
  };

  return (
    <>
      {cookie ? (
        <div>
          <nav className="navbar" role="navigation">
            <div className="Nav-logo">
              <img onClick={Dashboard} src={logo} className="logo" alt="logo" />
            </div>
            <div className="navbar-brand"></div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <div className="icon" onClick={MyProfile}>
                      <img src={user} className="icon-profile" alt="profile" />
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
                        src={logout}
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
          <nav className="navbar" role="navigation">
            <div className="Nav-logo">
              <img src={logo} className="logo" alt="" />
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <div className="icon">
                      <button onClick={Login} className="btn btn-dark">
                        Sign in
                      </button>
                      <button onClick={Register} className="btn btn-dark">
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default NavBar;
