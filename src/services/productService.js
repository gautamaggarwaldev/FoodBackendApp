const cloudinary = require('../config/cloudinaryConfig.js');
const productRepository = require('../repositories/productRepository.js');
const fs = require('fs/promises')

async function createProduct(productDetails) {

    // 1. We should check if the product image is coming to create the product, then we should first upload in cloudinary
    const imagePath = productDetails.imagePath;
    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        }
        catch (error) {
            console.log(error);
            throw { reason: "Not able to create a product", statusCode: 500 };
        }
    }

    // 2. then use the url from the cloudinary and other product details to add product
    const product = await productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    if (!product) {
        throw { reason: "Not able to create a product", statusCode: 500 };
    }

    return product;
}

module.exports = {
    createProduct
}