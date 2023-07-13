const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({
    dish_id: { 
       type: mongoose.Schema.Types.ObjectId,
       ref: 'dishSchema'
    },
    customer_id: { 
       type: mongoose.Schema.Types.ObjectId,
        // changed it based on the name which is decided for cook Schema
       ref: 'customerSchema'
    },
    order_description: {
        type: String,
        require: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('orderSchema', orderSchema);
