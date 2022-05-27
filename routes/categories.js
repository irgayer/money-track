const express = require('express');
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();
const AuthMiddleware = require('../middlewares/authMiddleware');

router.get('/', [AuthMiddleware], CategoryController.all);
router.post('/', [AuthMiddleware], CategoryController.create);
router.delete('/:id', [AuthMiddleware], CategoryController.delete);

module.exports = router;