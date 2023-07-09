const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema ({
    dish_name:{
        type: String,
        require: true
    },
    dish_ingredient:{
        type: String,
        require: true
    },
    cook: {
        type: mongoose.Schema.Types.ObjectId,
        // changed it based on the name which is decided for cook Schema
        ref: 'cookSchema'
    }

})

module.exports = mongoose.model('dishSchema', dishSchema)