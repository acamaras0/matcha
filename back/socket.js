import { Server } from "socket.io";
import db from "./config/Database.js";

export const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  let onlineUsers = [];

  const addOnlineUser = (user, socketId) => {
    !onlineUsers.some((u) => u.userId === user.id) &&
      onlineUsers.push({ userId: user.id, username: user.username, socketId });
  };

  const removeOnlineUser = (socketId) => {
    onlineUsers = onlineUsers.filter((u) => u.socketId !== socketId);
  };

  const getOnlineUser = (userId) => {
    console.log("userid", userId)
    return onlineUsers.find((u) => u.userId === userId);
  };

  io.on("connection", (socket) => {
    socket.on("addOnlineUser", (user) => {
      addOnlineUser(user, socket.id);
      io.emit("getUsers", onlineUsers);
    });

    socket.on(
      "sendNotification",
      ({ senderName, senderId, receiverName, type }) => {
        db.query(
          "INSERT INTO notifications (sender_id, sender_name ,reciever_id, type) VALUES (?,?,?,?)",
          [senderId, senderName, receiverName, type]
        );
        const reciever = getOnlineUser(receiverName);
        if (reciever) {
          io.to(reciever.socketId).emit("getNotification", {
            senderName,
            type,
          });
        }
      }
    );

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getOnlineUser(receiverId);
      console.log(senderId, receiverId, text);

        console.log("HERE", user.socketId)
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      
    });

    socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
    });
  });
};
