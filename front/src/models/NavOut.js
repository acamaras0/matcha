import React from "react";
import logo from "../assets/logo.png";
import { Link} from "react-router-dom";

export default function Nav() {
  return (
    <div className="Nav">
      <div className="Nav-content">
        <div className="Nav-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="Nav-links">
          <Link to="/logout"> Logout </Link>
          <Link to="/profile"> My account</Link>
          <Link to="/settings"> Settings </Link>
        </div>
      </div>
    </div>
  );
}