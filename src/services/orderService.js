const { getCartByUserId, clearCart } = require('../repositories/cartRepository.js');
const { createNewOrder, getOrderByUserId } = require('../repositories/orderRepository.js');
const { findUser } = require('../repositories/userRepository.js');
const BadRequestError = require('../utils/BadRequest');
const InternalServerError = require('../utils/InternalServerError');
const NotFoundError = require('../utils/NotFoundError.js');

async function createOrder(userId, paymentMethod) {

    const cart = await getCartByUserId(userId);
    const user = await findUser({_id: cart.user});
    console.log(cart);
    console.log(user);

    if(!cart) {
        throw new NotFoundError("Cart");
    }

    if(cart.items.length === 0) {
        throw new BadRequestError(["Cart is empty, please add some items to the cart"]);
    }

    const orderObject = {};

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartitem => {
        return {
            product: cartitem.product._id, 
            quantity: cartitem.quantity
        }
    });

    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    })


    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = await createNewOrder(orderObject); //

    if(!order) {
        throw new InternalServerError();
    }

    await clearCart(userId);

    return order;
}


async function getAllOrderByUserId(userId) {
    const orders = await getOrderByUserId(userId);
    if(!orders) {
        throw NotFoundError('Orders');
    }
    return orders;
}

module.exports = {
    createOrder,
    getAllOrderByUserId,
}