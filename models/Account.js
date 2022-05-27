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
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

var account = mongoose.model("Account", schema);

module.exports = account;