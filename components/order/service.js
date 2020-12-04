const { getUserByEmail } = require('../user/service.js');
const {Order} = require('./model.js');

exports.getOrder = async (req, res) =>{
    let query = {};
    if(req.body.movieId) query.movieId = req.body.movieId;
    let orders = await Order.find(query);
    res.json({'orders':orders});
} 
/*
let getOrderByUserId = async (id) =>{
    let orders = await Order.find({userId: id});
    return orders;
}*/

let getOrderByUserId = async (id) =>{
    let orders = await Order.find({userId: id});
    return orders;
}

exports.getOrderUser = async(req, res) =>{
    let user = await getUserByEmail(req, res);
    console.log("getOrderUSer: ", user);
    //console.log("id: ", user._id)
    try{
        order = await getOrderByUserId(user._id);
        console.log("order: ", order);
        if(order.length) res.json({"msg":"1 order was found", "content":order});
        else res.json({"msg":"No order was found", "content":""});
        return true;
    }catch{
        console.log("Error happened");
        order = "";
        res.status(400).json({"error":"Error"});
        return false;
    }
}

exports.addOrder = async (req, res) =>{
    let dateRent = new Date();
    let daysToRent = 7;
    let dateRefund = new Date(dateRent);
    dateRefund.setDate(dateRent.getDate() + daysToRent);
    if((await getOrderByUserId(req.body.userId)).length === 0){
        let newOrder = new Order({
            userId: req.body.userId, 
            movieId: req.body.movieId, 
            createdAt: dateRent, 
            refundDate: dateRefund
        });

        await newOrder.save();
        res.json({"msg":"Added"})
        return true;
    }else{
        res.json({"msg":"Not added"})
        return false;
    }
} 