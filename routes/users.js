var express = require('express');
var router = express.Router();

router.route('/settings')
    .get((req, res) => res.send('settings page'))
    .patch((req, res) => res.send('settings update proceed'));

module.exports = router;
