import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Conversations({ conversations, currentUser, socket }) {
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const friendId =
      conversations.user1 === parseInt(currentUser)
        ? conversations.user2
        : conversations.user1;

    if (socket) {
      socket.on("getMessage", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();

    const getMessagesNotif = async () => {
      const response = await axios.get(
        `http://localhost:5000/messages/notif/${currentUser}`,
        {}
      );
      setMessages(response.data);
    };
    getMessagesNotif();
    return () => {
      setUser({});
      setMessages({});
    };
  }, [conversations.user1, conversations.user2, currentUser, socket]);

  const handleRead = async () => {
    setMessages([]);
    await axios.post(`http://localhost:5000/messages/seen/${currentUser}`);
  };

  return (
    <div className="conversations" onClick={handleRead}>
      <img src={user && user.profile_pic} alt="" className="conversationImg" />
      {messages?.length > 0 && <div className="counter"></div>}
      <span key={uuidv4()} className="conversationName">
        {user && user.username}
      </span>
    </div>
  );
}
