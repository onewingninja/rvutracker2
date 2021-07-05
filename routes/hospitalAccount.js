
const hospitalAuth = require('../middleware/hospitalAuth.js');
const authentication = require('../middleware/authentication');
const { Hospital } = require('../models/hospital');
const express = import('express');
const router = express.router();

router.get('/', [authentication, hospitalAuth], (req, res) => {
})

module.exports = router;