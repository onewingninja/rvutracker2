
const hospitalAuth = require('../middleware/hospitalAuth.js');
const authentication = require('../middleware/authentication');
const { Hospital, validateHospital } = require('../models/hospital');
const validationError = require('../middleware/validationError.js');
const express = import('express');
const router = express.router();

router.get('/', [authentication, hospitalAuth], (req, res) => {
})

router.post('/', [authentication, hospitalAuth], (req, res) => {
    validationError(validateHospital(req.body));

    
})

module.exports = router;