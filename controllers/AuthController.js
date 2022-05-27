const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/jwt.config');

const generateAccessToken = (id) => {
    const payload = {
        id
    };

    return jwt.sign(payload, secret, {expiresIn: "1h"});
}

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors});
        }
        const {username, password} = req.body;
        const candidate = await UserModel.findOne({username});

        if (candidate) {
            return res.status(400).json({message: "user already exists!"});
        }

        const hashPassword = bcrypt.hashSync(password, 5);

        const user = new UserModel({username, password: hashPassword});
        await user.save();

        res.json({message: "success!"});
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await UserModel.findOne({username});

        if (!user)
            return res.status(400).json({message: "user not found!"});

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword)
            return res.status(400).json({message: "password is not correct!"});

        const token = generateAccessToken(user._id);
        res.json(token);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
}