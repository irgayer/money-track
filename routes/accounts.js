const express = require('express');
const AccountController = require("../controllers/AccountController");
const router = express.Router();

router.get('/', AccountController.all);
router.post('/', AccountController.create);
router.delete('/:id', AccountController.delete);

module.exports = router;