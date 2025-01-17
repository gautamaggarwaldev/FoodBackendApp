const Product = require('../schema/productSchema.js');

async function createProduct(productDetails) {
    try{
        const response = await Product.create(productDetails);
        return response;
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    createProduct
}