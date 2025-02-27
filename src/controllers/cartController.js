const { getCart, modifyCart, clearProductFromCart } = require("../services/cartService.js");
const AppError = require("../utils/appError.js");

async function getCartByUser(req, res) {
    try {
        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the cart",
            data: cart,
            error: {}
        });
    }
    catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        });
    }
}



async function modifyProductToCart(req, res) {
    try {
        const cart = await modifyCart(req.user.id, req.params.productId, req.params.operation == "add");
        return res.status(200).json({
            success: true,
            message: "Successfully added product to the cart",
            data: cart,
            error: {}
        });
    }
    catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        });
    }
}


async function clearCartById(req, res) {
    try {
        const cart = await clearProductFromCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "cClear all products from the cart",
            data: cart,
            error: {}
        });
    }
    catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        });
    }
}

module.exports = {
    getCartByUser,
    modifyProductToCart,
    clearCartById
}