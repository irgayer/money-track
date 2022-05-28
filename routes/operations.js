const express = require('express');
const OperationController = require('../controllers/OperationController');
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');
const {check} = require("express-validator");

router.get('/', [AuthMiddleware], OperationController.all);
router.post('/', [
    check("category", "category can not be empty").notEmpty(),
    check("account", "account can not be empty").notEmpty(),
    check("amount", "amount can not be empty").isNumeric().notEmpty(),
    AuthMiddleware
], OperationController.create);
//router.get('/outcomes', [AuthMiddleware], OperationController.outcomes);
//router.get('/incomes', [AuthMiddleware], OperationController.incomes);
router.delete('/:id', [AuthMiddleware], OperationController.delete);
module.exports = router;