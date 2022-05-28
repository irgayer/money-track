const express = require('express');
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const {check} = require("express-validator");

router.get('/', [AuthMiddleware], CategoryController.all);

router.post('/', [
    check("name", "name can not be empty").notEmpty(),
    check("categoryType", "categoryType can not be empty").notEmpty(),
    AuthMiddleware
], CategoryController.create);
router.delete('/:id', [AuthMiddleware], CategoryController.delete);

module.exports = router;