import React, { useEffect, useState} from "react";
import Axios from "axios";
import "../App.css";

export default function ProfilePage() {
    const [loginStatus, setLoginStatus] = useState("");
    const logout = () => {
        Axios.get("http://localhost:3001/logout").then((response) => {
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            setLoginStatus("");
          }
        });
      }
      return (
        <div>
            <p>{loginStatus}</p>
            <button onClick={logout}>Logout</button>
        </div>
      )
}