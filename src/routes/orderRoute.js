const express = require('express');
const { isLoggedIn } = require('../validation/authValidator.js');
const { createNewOrder, getallOrdersOfUser } = require('../controllers/orderController.js');

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createNewOrder);
orderRouter.get('/', isLoggedIn, getallOrdersOfUser);

module.exports = orderRouter;
