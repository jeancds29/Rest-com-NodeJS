const Sequelize = require("sequelize");

const connection = new Sequelize("table", "user", "password",{
    host: "localhost",
    dialect: "mysql",
    timezone: '-03:00'
})

module.exports = connection;
