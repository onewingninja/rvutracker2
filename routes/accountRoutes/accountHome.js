
const { User } = require('../../models/user.js');
const authentication = require('../middleware/authentication.js');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    if (req.user.roleId == 1) res.send.redirect('./hospital-account');

    if (!req.user.hospitals) return res.send("hospitalUndefined");

    const user = await User.findById(req.user._id);

    const homeData = (await _).pick(user, ['username', 'name', 'rvu', 'hospital']);

    res.send(homeData);
});

module.exports = router;