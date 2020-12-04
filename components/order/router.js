const express = require('express');
const router = express.Router();
const {auth, isAdmin} = require('../user/middlewares');

const {getOrder, getOrderUser, addOrder} = require('./service.js');

//ORDER MANAGEMENT
router.get('/myOrders', getOrderUser);
router.get('/', getOrder);
router.post('/', addOrder);

exports.routes = router;