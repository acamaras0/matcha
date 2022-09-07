import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Tags = db.define("tags", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tag: {
        type: DataTypes.STRING,
        unique: true,
    },
});

await Tags.sync();
export default Tags;