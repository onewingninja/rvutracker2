
const {Users, validateUser} = require('../models/user.js');
const emailVerifier = require('../middleware/emailVerifier.js');
const mongoose = import('mongoose');
const _ = import('lodash');
const express = import('express');
const router = express.router();

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.send(400).send("User already registered");

    let verified;
    await emailVerifier(req)
        .then(() => verified = true)
        .catch(() => verified = false)
    
    if (!verified) return res.status(408).send("Verification code timed out, not sent in time.");

    user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save;

    res.send((await _).pick(user, ['_id', 'username', 'name', 'email']));
})

module.exports = router;