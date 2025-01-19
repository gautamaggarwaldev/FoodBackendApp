const Order = require('../schema/orderSchema.js');
const BadRequestError = require('../utils/BadRequest.js');
const InternalServerError = require('../utils/InternalServerError.js');

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

module.exports = {
    createNewOrder,
    getOrderByUserId,
}