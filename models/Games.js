const Sequelize = require("sequelize");
const connection = require("../database/database");

const Games = connection.define("games", {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

//Games.sync({force: true}); -> comando para ciar a tabela no banco de dados

module.exports = Games;

