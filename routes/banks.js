var express = require('express');
var router = express.Router();

router.route('/')
    .get((req, res) => res.send('banks page'))
    .post((req, res) => res.send('banks create'))
    .delete((req, res) => res.send('delete bank'));

module.exports = router;