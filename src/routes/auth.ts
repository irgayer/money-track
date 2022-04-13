import express from "express";
const router = express.Router();

router.route('/signin')
    .get((req, res) => res.send('sign in page'))
    .post((req, res) => res.send('sign in proceed'));

router.route('/signup')
    .get((req, res) => res.send('sign up page'))
    .post((req, res) => res.send('sign up proceed'));

module.exports = router;