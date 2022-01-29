const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Task = db.define("tasks", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    is_finished: {
        type: DataTypes.TINYINT,
        default: 0
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "User",
            key: "id"
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        default: new Date()
    },
    updatedAt: {
        type: DataTypes.DATE,
        default: new Date()
    }
});

module.exports = Task;