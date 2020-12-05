const { getUserByEmail } = require('../user/service.js');
const {Order} = require('./model.js');

exports.getOrder = async (req, res) =>{
    let query = {};
    if(req.body.movieId) query.movieId = req.body.movieId;
    let orders = await Order.find(query);
    res.json({'orders':orders});
} 

let getOrderByUserId = async (id) =>{
    let orders = await Order.find({userId: id});
    return orders;
}

exports.getOrderUser = async(req, res) =>{
    let user = await getUserByEmail(req, res);
    //console.log("getOrderUSer: ", user);
    try{
        order = await getOrderByUserId(user._id);
        //console.log("order: ", order);
        if(order.length) res.json({"msg":"1 order was found", "content":order});
        else res.json({"msg":"No order was found", "content":""});
        return true;
    }catch{
        console.log("Error happened");
        order = "";
        res.status(400).json({"error":"Error", "content":order});
        return false;
    }
}

let userHasOrder = async (req, res) =>{
    return !!(await getOrderByUserId(req.body.userId)).length;
}

exports.addOrder = async (req, res) =>{
    if(!(await userHasOrder(req, res))){
        let {userId, movieId, daysToRent} = req.body;
        let createdAt = new Date();
        let refundDate = new Date(createdAt);
        refundDate.setDate(createdAt.getDate() + daysToRent);

        let newOrder = new Order({userId, movieId, createdAt, refundDate});
        await newOrder.save();
        res.json({"msg":"Added"})
        return true;
    }else{
        res.json({"msg":"Not added"})
        return false;
    }
} 