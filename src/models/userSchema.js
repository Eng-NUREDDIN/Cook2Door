const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['COOK', 'CUSTOMER']
    },
})

module.exports = mongoose.model('userSchema', userSchema);