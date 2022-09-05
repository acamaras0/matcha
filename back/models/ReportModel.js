import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Report = db.define("report", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  reported_id: {
    type: DataTypes.INTEGER,
  },
});

await Report.sync();
export default Report;
