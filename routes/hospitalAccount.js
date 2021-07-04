
const hospitalAuth = require('../middleware/hospitalAuth.js');
const authentication = require('../middleware/authentication');
const { Hospital } = require('../models/hospital');
const _ = import('lodash');
const express = import('express');
const router = express.router();

router.get('/', [authentication, hospitalAuth], (req, res) => {
    const homeData = _.pick(req.user, ['username', 'name', ''])
})

module.exports = router;