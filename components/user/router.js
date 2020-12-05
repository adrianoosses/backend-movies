const express = require('express');
const app = express();
const router = express.Router();

const {User} = require('./model.js');
const {auth, isAdmin} = require('./middlewares.js');
const {getProfile, login, addUser, getUsers, changeUser, deleteUserByName} = require('./service.js');

const mongoose = require('mongoose');

//#DUDA: check auth router.get('/login', auth, async (req, res, NEXT??) =>{
router.post('/login', login);

router.post('/', addUser);

// Endpoint de Perfil (R)read -> GET
router.get('/', getUsers);
router.get('/profile', auth, getProfile);
router.put('/', changeUser);

// Endpoint de Baja de usuario (D) -> DELETE
router.delete('/:id', isAdmin, deleteUserByName);

exports.routes = router;