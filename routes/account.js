
const accountHome = require('./accountRoutes/accountHome.js');
const accountLogs = require('./accountRoutes/accountLogs.js');
const accountHospitals = require('./accountRoutes/accountHospitals.js');
const express = import('express');
const router = express.router();

router.use('/home', accountHome);
router.use('/logs', accountLogs);
router.use('/hospitals', accountHospitals);

module.exports = router;