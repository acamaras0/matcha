import React, { useState, useEffect, useRef } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { getLoggedIn } from "../service/auth";
import { getConversations, getMessages, newMessages } from "../service/chat";
import Conversations from "../components/Conversations";
import Message from "../components/Message";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ socket }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const cookie = getCookie("refreshToken");
  const [user, setUser] = useState();
  const id = useParams().id;
  const scrollRef = useRef();

  useEffect(() => {
    if (cookie !== "") {
      const getUser = async () => {
        const response = await getLoggedIn(cookie);
        setUser(response);
      };
      getUser();
    }
  }, [cookie]);

  useEffect(() => {
    const getConvos = async () => {
      try {
        const res = await getConversations(id);
        setConversations(res);
      } catch (err) {
        console.log(err);
      }
    };
    getConvos();
    return () => {
      setConversations({});
    };
  }, [id]);

  useEffect(() => {
    if (currentChat) {
      const getMsg = async () => {
        try {
          const res = await getMessages(currentChat.id);
          setMessages(res);
        } catch (err) {
          console.log(err);
        }
      };
      if (currentChat) {
        const interval = setInterval(() => getMsg(), 4000);
        return () => clearInterval(interval);
      }
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

    socket.emit("sendNotification", {
      senderName: user.username,
      senderId: id,
      receiverName: receiverId,
      type: "message",
    });

    setMessages([...messages, message]);
    setNewMessage("");
    try {
      await newMessages(message);
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

  if (cookie === "") {
    return <Redirect to="/" />;
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
