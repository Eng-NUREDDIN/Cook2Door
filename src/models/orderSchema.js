const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cook_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CookSchema',
  },
  dish_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'dishSchema',
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customerSchema',
  },
  order_description: {
    type: String,
    required: false,
  },
  order_state: {
    type: String,
    enum: ['Pending', 'Preparing', 'Rejected', 'OTW', 'Delivered'],
    default: 'Pending',
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('orderSchema', orderSchema);
