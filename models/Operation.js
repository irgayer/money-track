const mongoose = require('mongoose');

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
    }
});

var operation = mongoose.model("Operation", schema);

module.exports = operation;