
const Joi = import('joi');
const { Log, validateLog } = require('../../models/log.js');
const { User } = require('../../models/user.js');
const authentication = require('../middleware/authentication.js');
const _ = import('lodash');
const Fawn = import('fawn');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    res.redirect('/1').send("Redirecting you to page 1")
})

router.get('/:id', authentication, (req, res) => {

    const schema = Joi.object({
        zoom: Joi.number().min(0).max(1024),
        sortBy: Joi.valid('time', 'rvu'),
        sortDirection: Joi.valid(1, 0)
    });

    const {error} = schema.validate(req.query);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findById(req.user._id);

    const zoom = 50 || req.query.zoom;

    const sortBy = "name" || req.query.sortBy;

    const sortDirection = 1 || req.query.sortDirection;

    const skip = (req.params.id - 1) * zoom

    const logs = user.logs.find()
    .skip(skip)
    .limit(zoom)
    .sort({sortBy: sortDirection});

    res.send(logs);
});

router.post('/', authentication, (req, res) => {
    const {error} = validateLog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);

    const log = user.logs.push(new Log((await _)
        .pick(req.body, ['rvuReq', 'task', 'description'])));

    res.send(log);
});

router.put('/:id', authentication, (req, res) => {
    const {error} = validateLog(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);

    const log = await user.logs.findById(req.params.id);

    const originalDate = log.time;
    log.closedTime = new Date().now;

    const updatedLog = new Log((await _)
        .pick(req.body, ['rvuReq', 'task', 'description']));
    updatedLog.time = originalDate;

    

    new Fawn.Task()
        .save('users', user)
        .then(() => {
            await user.logs.push(updatedLog);
        })
        .run();
    
    res.send(updatedLog);
});

router.delete('/:id', authentication,)

module.exports = router;