const Cart = require('../schema/cartSchema.js');
const BadRequestError = require('../utils/BadRequest.js');
const InternalServerError = require('../utils/InternalServerError.js');
const NotFoundError = require('../utils/NotFoundError.js');

async function createCart(userId) {
    try {
        const newCart = await Cart.create({
            user: userId
        });
        return newCart;
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

async function getCartByUserId(userId) {
    try {
        const cart = await Cart.findOne({
            user: userId
        }).populate('items.product'); // mongoose joins ---> populate
        return cart;
    }
    catch(error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function clearCart(userId) {
    try{
        const cart = await Cart.findOne({
            user: userId
        });
        if(!cart) {
            throw new NotFoundError("Cart");
        }
        cart.items = [];
        await cart.save();
        return cart;
    }
    catch(error) {
        throw new InternalServerError();
    }
}

module.exports = {
    createCart,
    getCartByUserId,
    clearCart
}