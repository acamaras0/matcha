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
          "SELECT * FROM block WHERE blocked_id = ? AND user_id = ?",
          [senderId, receiverName],
          (err, result) => {
            if (err) console.log(err);
            if (result.length <= 0) {
              db.query(
                "INSERT INTO notifications (sender_id, sender_name ,reciever_id, type) VALUES (?,?,?,?)",
                [senderId, senderName, receiverName, type]
              );
            }
          }
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

    socket.on("sendMessage", ({ chat_id, senderId, receiverId, text }) => {
      const user = getOnlineUser(receiverId);
      if (user) {
        io.to(user.socketId).emit("getMessage", {
          chat_id,
          senderId,
          text,
        });
      }
    });

    socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
    });
  });
};
