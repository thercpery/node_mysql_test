const { Sequelize } = require("sequelize");
module.exports = new Sequelize("taskdb", "root", "1234", {
    host: "localhost",
    dialect: "mysql"
});