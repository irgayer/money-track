var express = require('express');
var router = express.Router();

router.route('/signin')
    .get((req, res) => res.render('auth/signin'))
    .post((req, res) => res.send('sign in proceed'));

router.route('/signup')
    .get((req, res) => res.render('auth/signup'))
    .post((req, res) => res.send('sign up proceed'));

module.exports = router;