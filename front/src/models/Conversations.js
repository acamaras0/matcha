import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Conversations({ conversations, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId =
      conversations.user1 == currentUser
        ? conversations.user2
        : conversations.user1;

    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversations.user1, conversations.user2, currentUser]);

  console.log(user);

  return (
    <div className="conversations">
      <img src={user && user.profile_pic} alt="" className="conversationImg" />
      <span className="conversationName">{user && user.username}</span>
    </div>
  );
}
