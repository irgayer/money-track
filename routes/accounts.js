const express = require('express');
const AccountController = require("../controllers/AccountController");
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const {check} = require("express-validator");

router.get('/', [AuthMiddleware], AccountController.all);

router.post('/', [
    check("name", "name can not be empty").notEmpty(),
    check("categoryType", "categoryType can not be empty").notEmpty(),
    AuthMiddleware
],AccountController.create);
router.delete('/:id', [AuthMiddleware], AccountController.delete);

module.exports = router;