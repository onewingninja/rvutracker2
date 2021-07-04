
const authentication = require('../middleware/authentication.js');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    
})

module.exports = router;