const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    productName: {
        type: String,
        trim: true,
        minlength: [6, "The product name at least 6 characters long"],
        required: [true, "Product name is required"]
    },

    description: {
        type: String,
        trim: true,
        required: [true, "Product description is required"],
        minlength: [20, "The description at least 20 characters long"]
    },

    productImage: {
        type: String
    },

    price: {
        type: Number,
        required: [true, "Product price is required"]
    },

    category: {
        type: String,
        enum: ['veg', 'non-veg', 'drinks', 'sides'],
        default: 'veg'
    },

    inStock: {
        type: Boolean,
        required: [true, "In stock status required"],
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;