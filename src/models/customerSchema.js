
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: {
    type: Number,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  customer_address: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  provider_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
