import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";

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
                <button
                  onClick={Notifications}
                  className="btn btn-outline-warning"
                >
                  {" "}
                  Notifications{" "}
                </button>
                <button onClick={Chat} className="btn btn-outline-warning">
                  {" "}
                  Chat{" "}
                </button>
                <button
                  id="logout"
                  onClick={Logout}
                  className="btn btn-warning"
                >
                  {" "}
                  Log Out{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
