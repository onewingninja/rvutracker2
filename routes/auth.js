
const Joi = require("joi");
const { User, validateUser } = require("../models/user");
const mongoose = import('mongoose');
const _ = import('lodash');
const bcrypt = import('bcrypt');
const jwt = import('jsonwebtoken');
const config = import('config');
const express = import('express');
const router = express.router();

router.post('/', (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user;

    if(req.body.email)let user = await User.findOne({email: req.body.email});
    else let user = await User.findOne({username: req.body.username});

    if (!user) res.status(400).send("Invalid username/email and/or password.");

    const isValid = bcrypt.compare(req.body.password, user.password);

    if (!isValid) res.status(400).send("Invalid username/email and/or password.");

    const token = user.generateAuthToken();

    res.header(config.get('jwtHeader'), token).send(token);
});

function validate(req){
    const schema = {
        username: Joi.string().min(5).max(50).pattern("[ -~]")
        .alternatives().conditional(email, { is: undefined, then: Joi.required()}),
        email: Joi.string().min(1).max(225).pattern("[ -~]").email()
        .alternatives().conditional(username, { is: undefined, then: Joi.required()}),
        password: Joi.string().min(1).max(255).pattern("[a-zA-Z0-9]").required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;