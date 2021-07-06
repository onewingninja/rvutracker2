
const accountHome = require('./accountRoutes/accountHome.js');
const accountLog = require('./accountRoutes/accountLogs.js');
const express = import('express');
const router = express.router();

router.use('/home', accountHome);
router.use('/log', accountLog);

module.exports = router;