import { Server } from "socket.io";

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
    console.log("OKADJBGSMKA", onlineUsers);
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
    });

    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
      const reciever = getOnlineUser(receiverName);
      if (reciever) {
        io.to(reciever.socketId).emit("getNotification", {
          senderName,
          type,
        });
      }
    });

    socket.on("sendText", ({ senderName, receiverName, text }) => {
      const reciever = getOnlineUser(receiverName);
      if (reciever) {
        io.to(reciever.socketId).emit("getText", {
          senderName,
          text,
        });
      }
    });

    socket.on("disconnect", () => {
      removeOnlineUser(socket.id);
    });
  });
};
