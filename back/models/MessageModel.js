import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Message = db.define(
  "message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
    },
    sender: {
      type: DataTypes.INTEGER,
    },
    // reciever: {
    //   type: DataTypes.INTEGER,
    // },
    text: {
      type: DataTypes.STRING,
    },
    read: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

await Message.sync();
export default Message;
