const { createOrder, getAllOrderByUserId, getOrderByOrderId, updateOrder } = require("../services/orderService.js");
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

async function getallOrdersOfUser(req, res) {
    try {
        const order = await getAllOrderByUserId(req.user.id);
        return res.status(201).json({
            message: "Successfully fetched the order",
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



async function getallOrdersByOrderId(req, res) {
    try {
        const order = await getOrderByOrderId(req.params.orderId);
        console.log("Order from order id controller ", order);
        return res.status(200).json({
            message: "Successfully fetched the order",
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


async function cancelOrder(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, "CANCELLED");
        return res.status(200).json({
            success: true,
            message: "Successfully updated the order",
            error: {},
            data: order
        })
    } catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}



async function changeOrderStatus(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, req.body.status);
        return res.status(200).json({
            success: true,
            message: "Successfully updated the order",
            error: {},
            data: order
        })
    } catch(error) {
        console.log(error);
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
            data: {}
        })
    }
}



module.exports = {
    createNewOrder,
    getallOrdersOfUser,
    getallOrdersByOrderId,
    changeOrderStatus,
    cancelOrder
}