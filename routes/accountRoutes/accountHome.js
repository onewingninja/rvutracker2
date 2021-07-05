
const authentication = require('../middleware/authentication.js');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    if (req.user.roleId == 1) res.send.redirect('./hospital-account');

    if (!req.user.hospitals) return res.send("hospitalUndefined");

    const homeData = _.pick(req.user, ['username', 'name', 'rvu', 'hospital']);
});

module.exports = router;