/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Conversations from "../models/Conversations";
import Message from "../models/Message";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useHistory();
  const id = useParams().id;
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/newConvo/${id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/messages/${currentChat.id}`
          );
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: id,
      text: newMessage,
      chat_id: currentChat.id,
    };
    setMessages([...messages, message]);
    setNewMessage("");
    try {
      const res = await axios.post("http://localhost:5000/messages", message);
      // setMessages([...messages, res.data]);
      // setNewMessage("");
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(messages)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!cookie.refreshToken) {
    history.push("/");
  }

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations &&
            conversations.map((c) => (
              <div key={id} onClick={() => setCurrentChat(c)}>
                <Conversations conversations={c} currentUser={id} />
              </div>
            ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div key={m.id} ref={scrollRef}>
                    <Message message={m} own={m.sender === id} />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
