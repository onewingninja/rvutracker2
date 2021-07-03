
const {Users, validateUser, User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.router();

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.send(400).send("User already registered");

    user = new User({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save;

    res.send(user);
})

module.exports = router;