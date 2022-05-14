const mongoose = require('mongoose');

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
    }
})

var account = mongoose.model("Account", schema);

module.exports = account;