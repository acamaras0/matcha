import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useHistory} from "react-router-dom";
import fire from "../assets/fire.png";

export default function Conversations({ conversations, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId =
      conversations.user1 !== currentUser
        ? conversations.user1
        : conversations.user2;
    // console.log(friendId);

    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${friendId}`);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  console.log("conversations", currentUser);
  return (
    <div className="conversations">
      <img src={user && user.profile_pic} alt="" className="conversationImg" />
      <span className="conversationName">{user && user.username}</span>
    </div>
  );
}
