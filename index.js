const express = require("express");
const app = express();
const connection = require("./database/database");
const cors = require("cors");



app.use(cors());

// Body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log("Connection Made.")
    })
    .catch((erro) => {
        console.log(erro);
    })

//controllers
const gamesController = require("./controllers/gamesController");
const userController = require("./controllers/userController");

//rotas
app.use("/games", gamesController);
app.use("/users", userController);




app.listen(3030, () =>{
    console.log("API rodando na porta 3030")
});