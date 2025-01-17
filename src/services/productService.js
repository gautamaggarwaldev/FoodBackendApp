const cloudinary = require('../config/cloudinaryConfig.js');
const productRepository = require('../repositories/productRepository.js');
const fs = require('fs/promises');
const InternalServerError = require('../utils/InternalServerError.js');
const NotFoundError = require('../utils/NotFoundError.js');

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
            throw new InternalServerError();
        }
    }


    // 2. then use the url from the cloudinary and other product details to add product
    const product = await productRepository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    return product;

}

async function getProductById(productId) {
    const response = await productRepository.getProductById(productId);
    if (!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await productRepository.deleteProductById(productId);
    if (!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}