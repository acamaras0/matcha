import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UserImages = db.define(
  "user_images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    pic_name: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

await UserImages.sync();
export default UserImages;
