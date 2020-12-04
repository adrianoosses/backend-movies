const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CONST = {
    ROLES:{
        ADMIN: 'ADMIN',
        CLIENT: 'CLIENT'
    }
}
//si cambio el literal de user no me cambia todo igual q conf

exports.User = mongoose.model('User', new Schema({
    name:{type: String},
    pass:{type: String},
    email:{type: String},
    role:{type: String, default: CONST.ROLES.USER, enum: Object.values(CONST.ROLES) }, // devuelve un array con los values
}));

//exports.pelicula = {name: "The Goodfather", id:"1", genre:"drama", actors:"Marlon Brando"};
