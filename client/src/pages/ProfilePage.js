import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function ProfilePage() {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      if (response.data.error) {
        setMessage(response.data.error);
      } else if (response.data.message) {
        setStatus(response.data.message);
      }
    });
  };
  return (
    <div>
      <p>{status}</p>
      <p className="error">{message}</p>
      <button className="btn btn-primary" onClick={logout}>Logout</button>
    </div>
  );
}
