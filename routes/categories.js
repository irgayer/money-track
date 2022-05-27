const express = require('express');
const CategoryController = require("../controllers/CategoryController");
const router = express.Router();

router.get('/', CategoryController.all);
router.post('/', CategoryController.create);
router.delete('/:id', CategoryController.delete);

module.exports = router;