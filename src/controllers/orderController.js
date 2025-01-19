const { createOrder } = require("../services/orderService.js");
const AppError = require("../utils/appError.js");

async function createNewOrder(req, res) {
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.status(201).json({
            message: "Successfully created the order",
            success: true,
            error : {},
            data: order
        });
    }
    catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error,
                data: {}
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                data: {},
                error: error
            });
        }
    }
}

module.exports = {
    createNewOrder
}