import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Matches = db.define("matches", {
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
  match_status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

await Matches.sync();
export default Matches;
