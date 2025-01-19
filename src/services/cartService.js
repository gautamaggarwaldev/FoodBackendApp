const { getCartByUserId } = require("../repositories/cartRepository.js");
const { getProductById } = require('../repositories/productRepository.js');
const AppError = require("../utils/appError.js");
const BadRequestError = require("../utils/BadRequest.js");
const NotFoundError = require("../utils/NotFoundError.js");

async function getCart(userId) {
    const cart = await getCartByUserId(userId);
    if (!cart) {
        throw new NotFoundError('Cart');
    }
    return cart;
}


async function modifyCart(userId, productId, shouldAdd = true) {
    const quantityValue = (shouldAdd == true) ? 1 : -1
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if (!product) {
        throw new NotFoundError('Product');
    }
    if (!product.inStock && product.quantity <= 0) {
        throw new BadRequestError(["Product not available in stock."]);
    }

    // May be product is already in the cart
    let foundProduct = false;
    cart.items.forEach((item) => {
        if (item.product._id == productId) {
            if(shouldAdd) {
                if(product.quantity >= item.quantity + 1) {
                    item.quantity += quantityValue;
                }
                else {
                    throw new AppError("The quantity of the item requested is not available", 404);
                }
            }
            else {
                if(item.quantity > 0) {
                    item.quantity += quantityValue;
                    if(item.quantity == 0) {
                        cart.items = cart.items.filter(item => item.product._id != productId);
                        foundProduct = true;
                        return;
                    }
                }
                else {
                    throw new AppError("The quantity of the item requested is not available", 404);
                }
            }
            foundProduct = true;
        }
    });

    if (!foundProduct) {
        if (shouldAdd) {
            cart.items.push({
                product: productId,
                quantity: 1
            });
        }
        else {
            throw new NotFoundError("Product in the cart");
        }
    }

    await cart.save();

    product.quantity -= 1;

    await product.save();

    return cart;
}


module.exports = {
    getCart,
    modifyCart
}