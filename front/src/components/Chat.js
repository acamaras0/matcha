/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Conversations from "../models/Conversations";
import Message from "../models/Message";

const Chat = () => {
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useHistory();
  const id = useParams().id;

  if (!cookie.refreshToken) {
    history.push("/");
  }

  return (
    //   <h1>Chat {id}</h1>
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
            <Message/>
            <Message/>
            <Message/>
            <Message/>
            </div>
          <div className="chatBoxBottom"> </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">matches</div>
      </div>
    </div>
  );
};

export default Chat;
