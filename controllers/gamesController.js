const express = require("express");
const Games = require("../models/Games");
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")

router.get("/", tokenAuth, (req, res) =>{
    Games.findAll().then(games => {
        res.status(200);
        res.json(games);
    })
})

router.get("/:id", (req, res) =>{
    
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        if (id != undefined) {
            res.status(200);
            Games.findByPk(id).then(game =>{
                res.json(game)
            })

        } else {
            res.sendStatus(404); //404 Not Found
        }
        
    }
})

//rota para registrar novo jogo
router.post("/game", tokenAuth, (req, res) => {
    var {title, year, price} = req.body;
        
    if (title != undefined) {
        if (!isNaN(year)) {
            if (!isNaN(price)) {
                Games.create({
                    title: title,
                    year: year,
                    price: price
                }).then((game) =>{
                    res.status(200).json(game); //Ok => Requisição foi bem sucedida
                })
            } else {
                res.sendStatus(400);//Bad Request => Invalid data received
            }
        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(400);
    }
})

router.delete('/game/:id',  async (req, res) => {
    let {id} = req.params;
  
    if(isNaN(id)) res.sendStatus(400); //Bad Request => Invalid data received
    else{
      try {
        let found = await Games.findOne({where: {id: id}})
        if(found) {
          await Games.destroy({where: {id: id}}) 
          res.sendStatus(200);
        }else res.sendStatus(404);
        
      } catch (error) {
        console.log(error);
        res.sendStatus(500); //500 Internal Server Error
      }
    }
  })

router.put("/game/:id", tokenAuth, (req,res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        if (id != undefined) {
            var {title, year, price} = req.body
            Games.findByPk(id).then(game =>{
                if (game != undefined) {
                    game.update({
                        title: title,
                        year: year,
                        price: price
                    }), {where:{id: id}}

                    res.status(200);
                    res.send("Game Atualizado!!");
                }

            })

        } else {
            res.sendStatus(404)
        }
        
    }
})




module.exports = router;