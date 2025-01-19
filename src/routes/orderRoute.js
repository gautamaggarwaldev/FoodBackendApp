const express = require('express');
const { isLoggedIn, isAdmin } = require('../validation/authValidator.js');
const { createNewOrder, getallOrdersOfUser, getallOrdersByOrderId, changeOrderStatus, cancelOrder } = require('../controllers/orderController.js');

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createNewOrder);
orderRouter.get('/', isLoggedIn, getallOrdersOfUser);
orderRouter.get('/:orderId', isLoggedIn, getallOrdersByOrderId);
orderRouter.put('/:orderId/cancel', isLoggedIn, cancelOrder);
orderRouter.put('/:orderId/status', isLoggedIn, isAdmin ,changeOrderStatus);

module.exports = orderRouter;
