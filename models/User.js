const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accounts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Account"
        }
    ],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    ],
    operations: [
        {
            type: Schema.Types.ObjectId,
            ref: "Operation"
        }
    ]
});

const user = mongoose.model('User', schema);

module.exports = user;