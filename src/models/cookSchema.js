const mongoose = require('mongoose');

const cookSchema = mongoose.Schema({
  cook_address: {
    type: String,
    required: [true, 'Address is required.'],
  },
  cook_phone: {
    type: String,
    required: [true, 'Phone number is required.'],
    maxLength: [11, 'Phone number should not be more than 11 characters.'],
  },
  cook_info: {
    type: String,
    required: [true, 'Cook info is required.'],
    minLength: [15, 'Cook info should not be less than 15 characters.'],
  },
  cook_name: {
    type: String,
    required: [true, 'Cook name is required.'],
    maxLength: [30, 'Cook name should not be more than 30 characters.'],
    minLength: [3, 'Cook name should not be less than 3 characters.'],
  },
  'cooker_id ': {
    //type: mongoose.Schema.Types.ObjectId,
    //ref: 'UserSchema',
    type: String,
    required: [true, 'Cooker id is required.'],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('CookSchema', cookSchema);
