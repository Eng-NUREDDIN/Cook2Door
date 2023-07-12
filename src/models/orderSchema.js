const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'dishSchema'
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // changed it based on the name which is decided for cook Schema
        ref: 'customerSchema'
    },
    order_description: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('orderSchema', orderSchema)