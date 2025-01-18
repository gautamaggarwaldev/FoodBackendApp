const { getCartByUserId } = require("../repositories/cartRepository.js");
const NotFoundError = require("../utils/NotFoundError.js");

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if(!cart) {
        throw new NotFoundError('Cart');
    }
    return cart;
}


module.exports = {
    getCart
}