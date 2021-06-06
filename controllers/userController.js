const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWTSecret = "afefsfrgdkmglskmfkmsdfklgmsdrgafdrrafgalkmgkm"


//rota para criação de usuarios
router.post("/new", (req, res) =>{
    var {name, email, password} = req.body;

    User.findOne({where:{email: email}}).then(user =>{
        if (user == undefined) {

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
        
            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.status(201); //Created => Requisição foi bem sucedida e um novo recurso foi criado como resultado.
                res.json("Usuario Criado")
            }).catch((error) => {
                res.status(400); //Bad Request => Invalid data received
                res.json(error);
            }) 
        } else {
           res.send("email invalido!")
        }
    })
        
    //para fins de teste a senha é o nome em letra minuscula e junto
})

//rota para autorizar usuario na api
router.post("/auth",(req, res) =>{
    var {email, password} = req.body;

    User.findOne({where:{email: email}}).then(user =>{
        
        if (user != undefined) {
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                jwt.sign({id: user.id,email: user.email}, JWTSecret, {expiresIn: "48h"}, (error, token) =>{
                    if (error) {
                        res.status(500)
                        res.json({error: "Falha interna"})
                    } else {
                        res.status(200);
                        res.json({token: token})
                    }
                })
            } else {
                res.status(401);
                res.json({error: "Senha Invalidas"})
            }
        
        } else {
            res.status(404);
            res.json({error: "email invalido"})
        }
    })
})


module.exports = router;