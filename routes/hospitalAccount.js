
const hospitalAccountHome = require('./hospitalAccountRoutes/hospitalAccountHome.js');
const hospitalAccountRoutes = require('./hospitalAccountRoutes/hospitalAccountHospitals.js');
const express = import('express');
const router = express.router();

router.use('/home', hospitalAccountHome);
router.use('/hospitals')

module.exports = router;