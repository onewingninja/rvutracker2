
const { User } = require('../../models/user.js');
const authentication = require('../middleware/authentication.js');
const _ = import('lodash');
const express = import('express');
const router = express.router();

router.get('/', authentication, async (req, res) => {
    if (req.user.roleId == 1) res.send.redirect('./hospital-account');

    if (!req.user.hospitals) return res.send("hospitalUndefined");

    const user = await User.findById(req.user._id);

    let isMultple = false;

    if (user.hospitals.length > 1) isMultple = true;

    let homeData = (await _).pick(user, ['username', 'name', 'rvu']);
    (await _).set(homeData, 'hospitals', user.hospitals[0]);
    (await _).set(homeData, 'isThereMore', isMultple);

    res.send(homeData);
});

module.exports = router;