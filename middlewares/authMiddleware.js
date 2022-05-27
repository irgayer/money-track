const jwt = require('jsonwebtoken');
const {secret} = require('../config/jwt.config');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS")
        next();

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(401).json({message: "you are not logged in!"});

        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({message: "you are not logged in!"});
    }
}