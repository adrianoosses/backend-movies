const mongoose = require("mongoose");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

/*
exports.Order = mongoose.model('Order', new Schema({
    userId:{type: ObjectId, ref: 'User'}, 
    movieId:{type: ObjectId, ref: 'Movie'},
    createdAt: { type: Date, default: Date},
    refundDate: {type: Date}
})); */


exports.Order = mongoose.model('Order', new Schema({
    userId:{type: ObjectId, ref: 'User'}, 
    movieId:{type: Number},
    createdAt: { type: Date, default: Date},
    refundDate: {type: Date}
})); 


