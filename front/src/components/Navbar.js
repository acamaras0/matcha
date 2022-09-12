import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import chat from "../assets/chat.png";
import notification from "../assets/notification.png";
import logout from "../assets/logout.png";

const Navbar = () => {
  const history = useHistory();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const Notifications = () => {
    history.push("/notifications");
  };

  const Chat = () => {
    history.push("/chat");
  };
  const Dashboard = () => {
    history.push("/dashboard");
  };

  return (
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
                <img
                  onClick={Notifications}
                  src={notification}
                  className="iconImg"
                  alt="notif"
                />
                <div className="counter">2</div>
                <img onClick={Chat} src={chat} alt="chat" className="iconImg" />
                <div className="counter">2</div>
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
  );
};

export default Navbar;
