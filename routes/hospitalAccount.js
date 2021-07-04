
const admin = require('../middleware/admin');
const authentication = require('../middleware/authentication');
const { Line } = require('../models/line');
const express = import('express');
const router = express.router();

router.get('/', [authentication, admin], (req, res) => {
    res.redirect('/1');
})

router.get('/:page', [authentication, admin], (req, res) => {
    const skip = (req.params.page - 1) * 10;
    const lines = await Line
    .find()
    .skip(skip)
    .limit(10)
    .sort({name: 1});

    return lines;
})

module.exports = router;