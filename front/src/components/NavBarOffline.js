import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBarOffline = () => {
  const history = useHistory();

  const Login = () => {
    history.push("/");
  };

  const Register = () => {
    history.push("/register");
  };

  return (
    <>
      <nav className="navbar" role="navigation">
        <div className="Nav-logo">
          <img src={logo} className="logo" alt="" />
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <div className="icon">
                  <button onClick={Login} className="btn btn-warning">
                    Sign in
                  </button>
                  <button onClick={Register} className="btn btn-warning">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarOffline;
