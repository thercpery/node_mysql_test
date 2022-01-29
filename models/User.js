const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
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

module.exports = User;