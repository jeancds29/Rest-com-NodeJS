const jwt = require("jsonwebtoken");

const JWTSecret = "afefsfrgdkmglskmfkmsdfklgmsdrgafdrrafgalkmgkm";

function tokenAuth(req, res, next) {
    var headersToken = req.headers["authorization"];

    if (headersToken != undefined) {
        const bearer = headersToken.split(' ');//atenção headersToken.split(' ')=> certo // headersToken.split('') => Errado
        const token = bearer[1];
    
        jwt.verify(token, JWTSecret, (error, data) =>{
            if (error) {
                res.status(401);
                res.json({error:"Token invalido"});
            } else {
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};

                next();
            }
        })

    } else {
        res.status(401);
        res.json({error:"Token invalido"});
    }
   
   
}

module.exports = tokenAuth;