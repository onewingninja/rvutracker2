
const authentication = require('../middleware/authentication.js');
const { Log, validateLog } = require('../models/log.js');
const _ = import('lodash');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    if (req.user.roleId == 1) res.send.redirect('./hospital-account');

    if (!req.user.hospitals) return res.send("hospitalUndefined");

    const homeData = _.pick(req.user, ['username', 'name', 'rvu', 'hospital']);
});

router.post('/log-rvu', authentication, (req, res) => {
    const {error} = validateLog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let log = new Log(_.pick(req.body, ['rvu', 'task', 'description']));

    log.save();

    res.send(log);
})

module.exports = router;