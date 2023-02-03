import React from "react";
import { useState, useEffect } from "react";
import { getMatch, markAsSeen } from "../service/chat";
import { countUpViews } from "../service/user";
import { v4 as uuidv4 } from "uuid";

export default function Conversations({ conversations, currentUser }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const friendId =
      conversations.user1 === parseInt(currentUser)
        ? conversations.user2
        : conversations.user1;

    const getUser = async () => {
      try {
        const res = await getMatch(friendId);
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();

    return () => {
      setUser({});
    };
  }, [conversations.user1, conversations.user2, currentUser]);

  const handleRead = async () => {
    await markAsSeen(currentUser);
  };

  const goToProfile = async () => {
    window.location.replace(`/users/${user.id}`);
    await countUpViews(user.id);
  };

  return (
    <div className="conversations">
      <img
        src={user && user.profile_pic}
        alt=""
        className="conversationImg"
        onClick={goToProfile}
      />
      <span key={uuidv4()} className="conversationName" onClick={handleRead}>
        {user && user.username}
      </span>
    </div>
  );
}
