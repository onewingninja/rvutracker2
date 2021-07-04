
const authentication = require('../middleware/authentication.js');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    if (req.user.roleId == 1) res.send.redirect('./hospital-account');

    
})

module.exports = router;