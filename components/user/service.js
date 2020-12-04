const {User} = require('./model.js');
let jwt = require('jsonwebtoken');
let claveToken = "fdfdkjfd.sa#fjpdfjkl";

exports.generateToken = (user)=>{
    let newUser = {
        email: user.email
    }
    console.log("email: " + newUser.email);
    return token = jwt.sign(newUser, claveToken, {expiresIn: 60 * 60 * 24})
}

exports.getUserById = async (userId) =>{
    return await User.findOne({_id: userId});
} 
let getUsersByBody = async (req, res) =>{
    let query = {};
    let users = null;
    if(!!req.body.email) query.email = req.body.email;
    if(query.email !== undefined){
        users = await User.findOne(query);
    }
    return users;
};

let getUsersBy = async (req, res) =>{
    let query = {};
    if(!!req.query.name) query.name = req.query.name;
    if(!!req.params._id) query._id = req.params._id;
    let users = await User.find(query);
    return users;
};

let getUserByEmail = async (req, res) =>{
    let query = {};
    if(!!req.query.email) query.email = req.query.email;
    let user = await User.findOne(query);
    return user;
};

exports.getUserByEmail = getUserByEmail;

exports.getProfile = async(req, res) => {
    let user = "";
    try{
        user = await getUserByEmail(req, res);
        console.log("user: ", user);
        res.json(user);
        return true;
    }catch{
        res.status(400).json({"Error":user});
        return false;
    }
    
}


exports.getUsers = async (req, res) =>{
    let users = await getUsersBy(req, res);
    res.json(users);
    return users;
};

exports.deleteUserByName = async (req, res) =>{
    let id = req.params.id; // body
    await User.deleteOne({_id: id});
    res.json({"msg": id + "eliminado"});
}

exports.decodeToken = (token) =>{
    try {
        return jwt.verify(token, claveToken);
    } catch(e) {
        return null;
    }
}

exports.addUser = async (req, res) =>{
    let msg = "User added.";
    let newUser = {name: req.body.name, pass: req.body.password, email:req.body.email, role: req.body.role}
    const user = new User(newUser);
    await user.save();
    res.json({"message":msg}); 
    return true;
};

exports.login = async(req, res) =>{
    try{
        let password = req.body.password;
        let usrLoginString = await getUsersByBody(req, res);
        console.log("usrLoginString", usrLoginString);
        if(usrLoginString && usrLoginString.pass === password){
            console.log("Correct user and token. LOOGED");
            res.json({"msg":"Logged"});
            resul = true;
        } else{
            res.json({"error":"Wrong user or password "});
            return false;
        }
    }catch{
        res.status(400).json({"error":"error"})
        return false;
    }
};

exports.changeUser = async(req, res) =>{
    let awaitObj = (await getUsersBy(req, res))[0];
    awaitObj.name = req.body.name;
    awaitObj.save();
    res.json({"msg":awaitObj.name + " changed"})
};