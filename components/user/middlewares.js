//const us = require('./service.js');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";
let jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let {email} = req.query;
    const token = req.headers.authorization;
    console.log("token: " + token);
    //Option 2: access to moongose db

    try{
        jwt.verify(token, claveToken);
        next();
    }catch{
        res.status(400).json({"error":"token error"})
        console.log("Error");
    }
    
    /*
    else if((await tokenDb)[0].token === token){ 
        next();
    } else{
         console.log("Unathorized");
         res.json({error:"Unauthorized."})
    }*/
}

exports.isAdmin = (req, res, next) => {
    if(req.body.role === 'ADMIN'){
        console.log("User is admin.");
        next();
    } else{
        console.log("ERROR: User is not admin.");
        res.json({"msg":"ERROR: not authorized."})
    }
}