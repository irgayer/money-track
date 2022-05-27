const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

var operation = mongoose.model("Operation", schema);

module.exports = operation;