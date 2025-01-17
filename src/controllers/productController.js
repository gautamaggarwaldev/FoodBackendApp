const { createProduct } = require('../services/productService.js')

async function addProduct(req, res) {
    try {
        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file.path,
            price: req.body.price,
            category: req.body.category,
            inStock: req.body.inStock
        });

        return res.status(201).json({
            success: true,
            data: product,
            message: "Product created successfully...",
            error: {}
        })
    }
    catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            message: error.reason,
            success: false,
            error: error,
            data: {}
        });
    }
}

module.exports = {
    addProduct
}