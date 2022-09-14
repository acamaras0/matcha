/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Conversations from "../models/Conversations";
import Message from "../models/Message";
import ChatMatches from "../models/ChatMatches";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useHistory();
  const id = useParams().id;

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/newConvo/${id}`
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  if (!cookie.refreshToken) {
    history.push("/");
  }

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          <Conversations />
          <Conversations />
          <Conversations />
          <Conversations />
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
          </div>
          <div className="chatBoxBottom"> </div>
          <textarea
            placeholder="Write something ..."
            className="chatMessageInput"
          ></textarea>
          <button className="chatSubmitButton">Send</button>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatMatches />
          <ChatMatches />
          <ChatMatches />
        </div>
      </div>
    </div>
  );
};

export default Chat;
