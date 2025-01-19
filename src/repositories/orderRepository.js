const Order = require('../schema/orderSchema.js');
const BadRequestError = require('../utils/BadRequest.js');
const InternalServerError = require('../utils/InternalServerError.js');
const NotFoundError = require('../utils/NotFoundError.js');

async function createNewOrder(orderDetails) {
    try {
        const order = await Order.create(orderDetails);
        return order;
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InternalServerError();
    }
}


async function getOrderByUserId(userId) {
    try {
        const order = await Order.find({user: userId}).populate('items.product');
        return order;
    }
    catch(error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function getOrderById(orderId) {
    try {
        const order = await Order.findById(orderId).populate('items.product');
        if (!order) {
            throw new NotFoundError('Order');
        }
        return order;
    }
    catch(error) {
        console.log(error);
        throw new InternalServerError();
    }
}


async function updateOrderStatus(orderId, status) {
    try {
        const order = Order.findByIdAndUpdate(orderId, {status: status}, {new : true});
        console.log(order);
        return order;
    }
    catch(error) {
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    createNewOrder,
    getOrderByUserId,
    getOrderById,
    updateOrderStatus
}