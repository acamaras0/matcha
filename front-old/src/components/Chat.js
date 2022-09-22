/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Conversations from "../models/Conversations";
import Message from "../models/Message";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ socket }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
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
    const receiverId =
      parseInt(currentChat.user1) !== parseInt(id)
        ? parseInt(currentChat.user1)
        : parseInt(currentChat.user2);

    const message = {
      sender: id,
      receiver: receiverId,
      text: newMessage,
      chat_id: currentChat.id,
    };

    socket.emit("sendMessage", {
      chat_id: currentChat.id,
      senderId: id,
      receiverId: receiverId,
      text: newMessage,
    });

    setMessages([...messages, message]);
    setNewMessage("");
    try {
      await axios.post("http://localhost:5000/messages", message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data) => {
        setArrivalMessage({
          chat_id: data.chat_id,
          sender: data.senderId,
          text: data.text,
          time: Date.now(),
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.id === arrivalMessage?.chat_id &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  if (!cookie.refreshToken) {
    history.push("/");
  }

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="card">
          <p className="chatMenuInput text-center"> Your Matches </p>
          {conversations &&
            conversations.map((c) => (
              <div key={uuidv4()} onClick={() => setCurrentChat(c)}>
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
                {messages?.map((m) => (
                  <div key={uuidv4()} ref={scrollRef}>
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
