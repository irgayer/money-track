import express from "express";
const router = express.Router();

router.route('/')
    .get((req, res) => res.send('categories page'))
    .post((req, res) => res.send('categories create'))
    .delete((req, res) => res.send('delete category'));

module.exports = router;