const express = require('express');
const AuthController = require("../controllers/AuthController");
const {check} = require("express-validator");
const router = express.Router();

router.post('/login', AuthController.login);
router.post('/registration', [
    check("username", "username can not be empty").notEmpty(),
    check("password", "password must be at least 8 characters").isLength({min: 8})
], AuthController.register);

module.exports = router;