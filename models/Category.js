const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    categoryType: {
        type: String,
        enum: ['income', 'outcome'],
        default: 'outcome'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

var category = mongoose.model("Category", schema);

module.exports = category;