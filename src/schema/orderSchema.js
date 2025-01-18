const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },

            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],

    totalPrice : {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ["ORDERED", "PROCESSING", "DELIVERED", "OUT_FOR_DELIVERED", "CANCELLED"],
        default: "ORDERED"
    },

    address: {
        type: String,
        minlength: [10, "Address should atleast 10 characters long"],
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["ONLINE", "CASH"],
        default: "CASH"
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
