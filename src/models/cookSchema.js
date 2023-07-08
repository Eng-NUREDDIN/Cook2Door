const mongoose = require('mongoose');

const cookSchema = mongoose.Schema({
  cook_address: {
    type: String,
    required: true,
  },
  cook_phone: {
    type: String,
    required: true,
  },
  cook_info: {
    type: String,
  },
  cook_name: {
    type: String,
  },
});

module.exports = mongoose.model('Cook', cookSchema);
