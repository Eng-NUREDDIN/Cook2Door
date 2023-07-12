const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema ({
    dish_name: {
        type: String,
        required: true
    },
    dish_ingredient: {
        type: String,
        required: true
    },
    cook_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        // changed it based on the name which is decided for cook Schema6
        ref: 'cookSchema'
    },
})

module.exports = mongoose.model('dishSchema', dishSchema)