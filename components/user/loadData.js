const mongoose = require('mongoose');
const {User} = require('./model.js');

exports.loadUsers = async () =>{
    const adrianoObj = {name: 'adriano', pass: '123456', email: 'adriano@geekshubs.com', role: 'ADMIN'};
    //const mortadeloObj = {id: null, name: 'mortadelo', pass: '654321', role: 'client'};
    const adriano = new User(adrianoObj);
    await adriano.save();
}

//loadUsers().then();