
const accountHome = require('./accountRoutes/accountHome.js');
const accountLog = require('./accountRoutes/accountLog.js');
const _ = import('lodash');
const express = import('express');
const router = express.router();

router.use('/home', accountHome);
router.use('/log', accountLog);

module.exports = router;