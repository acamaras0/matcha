import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Chat = db.define(
  "chat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user1: {
      type: DataTypes.INTEGER,
    },
    user2: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

await Chat.sync();
export default Chat;
