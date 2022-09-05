import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Block = db.define("block", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  blocked_id: {
    type: DataTypes.INTEGER,
  },
});

await Block.sync();

export default Block;
