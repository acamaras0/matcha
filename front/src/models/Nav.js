import React from "react";
import logo from "../assets/logo.png";
import { Link} from "react-router-dom";

const Nav = () => {
  return (
    <div className="Nav">
      <div className="Nav-content">
        <div className="Nav-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="Nav-links">
          <Link to="/"> Login </Link>
          <Link to="/registration"> Register </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;