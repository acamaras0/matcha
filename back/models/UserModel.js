import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    activ_status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    birthdate: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING,
    },
    orientation: {
      type: DataTypes.STRING,
      defaultValue: "bisexual",
    },
    city: {
      type: DataTypes.STRING,
    },
    interests: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    online: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

await Users.sync();
export default Users;
