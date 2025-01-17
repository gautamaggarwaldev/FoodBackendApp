const { createProduct, getProductById, deleteProductById } = require('../services/productService.js');
const AppError = require('../utils/appError.js');

async function addProduct(req, res) {
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file?.path,
            price: req.body.price,
            category: req.body.category,
            inStock: req.body.inStock
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully...",
            error: {},
            data: product
        })
    }
    catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error,
                data: {}
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            data: {},
            error: error
        });
    }
}


async function getProduct(req, res) {
    try {
        const response = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the product",
            error: {},
            data: response
        })
    }
    catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error,
                data: {}
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            data: {},
            error: error
        });
    }
}


async function deleteProduct(req, res) {
    try {
        const response = await deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Successfully deleted the product",
            error: {},
            data: response
        })
    }
    catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                error: error,
                data: {}
            });
        }
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            data: {},
            error: error
        });
    }
}


module.exports = {
    addProduct, 
    getProduct,
    deleteProduct
}