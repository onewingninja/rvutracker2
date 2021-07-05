
const Joi = import('joi');
const { Log, validateLog } = require('../../models/log.js');
const { User } = require('../../models/user.js');
const authentication = require('../middleware/authentication.js');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    res.redirect('/1').send("Redirecting you to page 1")
})

router.get('/:id', authentication, (req, res) => {

    const schema = {
        zoom: 
    }
    const user = await User.findById(req.user._id);

    const zoom = 50 || req.query.zoom;

    const sortBy = "name" || req.query.sortBy;

    const sortDirection = 1 || req.query.sortDirection;

    const skip = (req.params.id - 1) * zoom

    user.logs.find()
    .skip(skip)
    .limit(zoom)
    .sort({sortBy: sortDirection})

    res.send()
})

router.post('/add', authentication, (req, res) => {
    const {error} = validateLog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);

    const log = user.logs.push(new Log(req.body));

    res.send(log);
});

module.exports = router;