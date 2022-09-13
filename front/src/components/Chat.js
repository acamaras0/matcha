/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Chat = () => {
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useHistory();
  const id = useParams().id;

  if (!cookie.refreshToken) {
    history.push("/");
  }

  return (
    <div className="text-center">
      <h1>Chat {id}</h1>
    </div>
  );
};

export default Chat;
