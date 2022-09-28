import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import chat from "../assets/chat.png";
import notification from "../assets/notification.png";
import logout from "../assets/logout.png";
// import user from "../assets/user.png";
import filter from "../assets/filter.png";
import { useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";
import { v4 as uuidv4 } from "uuid";

const Navbar = ({ socket }) => {
  const xsrfToken = getCookie("refreshToken");
  const [loggedIn, setLoggedin] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  console.log(messages);

  useEffect(() => {
    if (socket) {
      socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data]);
      });
    //   socket.on("getMessage", (data) => {
    //     setMessages((prev) => [...prev, data]);
    //   });
    }
    if (xsrfToken !== "") {
      const getLoggedIn = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/${xsrfToken}`,
          {}
        );
        setLoggedin(response.data);
      };
      getLoggedIn();
    }

    const getNotifications = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/notifications/${loggedIn.id}`,
        {}
      );
      setNotifications(response.data);
    };
    getNotifications();

    const getMessagesNotif = async () => {
      const response = await axios.get(
        `http://localhost:5000/messages/${loggedIn.id}`,
        {}
      );
      setMessages(response.data);
    };
    getMessagesNotif();

    return () => {
      setNotifications({});
      setMessages({});
    };
  }, [socket, xsrfToken, loggedIn.id]);

  const displayNotifications = ({ sender_name, senderName, type }) => {
    let action;
    if (type === "like") {
      action = "liked you";
    } else if (type === "unlike") {
      action = "unliked you";
    } else if (type === "profile view") {
      action = "viewed your profile";
    } else if (type === "match") {
      action = "You got a match!";
    }
    return (
      <p className="notification" key={uuidv4()}>{`${
        sender_name ? sender_name : senderName
      } ${action}`}</p>
    );
  };

  const handleRead = async () => {
    setNotifications([]);
    setOpen(false);
    await axios.post(`http://localhost:5000/user/mark/${loggedIn.id}`);
  };

  const Chat = async () => {
    setMessages([]);
    history.push(`/chat/${loggedIn.id}`);
    await axios.post(`http://localhost:5000/messages/seen/${loggedIn.id}`);
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
    history.push("/dashboard");
  };

  const Filter = () => {
    history.push(`/filter/${loggedIn.id}`);
  };

  return (
    <>
      <nav className="navbar" role="navigation">
        <div className="container">
          <div className="navbar-brand">
            <div className="Nav-logo">
              <img onClick={Dashboard} src={logo} className="logo" alt="" />
            </div>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <div className="icon" onClick={MyProfile}>
                    <img
                      src={loggedIn.profile_pic}
                      className="icon-profile"
                      alt="profile"
                    />
                  </div>
                  <div className="icon" onClick={Filter}>
                    <img src={filter} className="icon-profile" alt="profile" />
                  </div>
                  <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={notification} className="iconImg" alt="notif" />
                    {notifications?.length > 0 && (
                      <div className="counter"></div>
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
        </div>
      </nav>
      {open && (
        <div className="notifications">
          {notifications?.map((n) => displayNotifications(n))}
          <button className="btn btn-warning" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
