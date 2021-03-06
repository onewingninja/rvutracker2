
const logAuth = require('../../middleware/logAuth.js');
const rvuSetter = require('../../middleware/rvuSetter.js');
const validationError = require('../../middleware/validationError.js');
const { Log, validateLog } = require('../../models/log.js');
const { User } = require('../../models/user.js');
const authentication = require('../middleware/authentication.js');
const _ = import('lodash');
const { validate,  Joi } = import('express-validation');
const express = import('express');
const router = express.router();

router.get('/:id', authentication, (req, res) => {
    const user = await User.findById(req.user._id);

    try{
        const log = await user.logs.findById(req.params._id);
    }
    catch(err){
        res.status(404).send("Could not find a log with that id");
    }
});

router.get('/list/', authentication, (req, res) => {
    res.redirect('./1').send("Redirecting you to page 1")
});

const getSchema = {
    query: Joi.object({
        zoom: Joi.number().min(0).max(1024),
        sortBy: Joi.valid('time', 'rvu'),
        sortDirection: Joi.valid(1, 0),
        isIncludingInactive: Joi.boolean()
})};

router.get('/list/:id', [authentication, validate(getSchema)], async (req, res) => {

    validationError(schema.validate(req.query));
    
    const user = await User.findById(req.user._id);

    const zoom = 50 || req.query.zoom;

    const sortBy = "name" || req.query.sortBy;

    const sortDirection = 1 || req.query.sortDirection;

    const isIncludingInactive = false || req.query.isIncludingInactive;
    if (isIncludingInactive)

    const skip = (req.params.id - 1) * zoom

    const logs = user.logs.find({status: {$ne: 
        (isIncludingInactive) ? 'random1234567890' : 'inactive'}})
        .skip(skip)
        .limit(zoom)
        .sort({sortBy: sortDirection});
    res.send(logs);
});

router.post('/', authentication, async (req, res) => {

    const user = await User.findById(req.user._id);

    validationError(validateLog(req.body, user));

    validationError(logAuth(req.body.hospital, user));

    const log = user.logs.push(new Log((await _)
        .pick(req.body, ['rvuReq', 'task', 'description', 'hospital'])));

    res.send(log);
});

router.put('/:id', authentication, async (req, res) => {

    const user = await User.findById(req.user._id);

    validationError(validateLog(req.body, user));

    const log = await user.logs.findById(req.params.id);
    if (!log) res.status(404).send("Log not found");

    const originalDate = log.time;
    log.closedTime = new Date().now;

    const updatedLog = new Log((await _)
        .pick(req.body, ['rvuReq', 'task', 'description']));
    updatedLog.time = originalDate;

    try{
        rvuSetter(log, req.body.hospitalId);
    }
    catch(err){
        next(err)
    }

    user.logs.push(updatedLog);

    user.save();
    
    res.send(updatedLog);
});

router.delete('/:id', authentication, async (req, res) => {
    const user = await User.findById(req.user._id);
    const log = await user.logs.findByIdAndUpdate(req.params.id, {
        $set: {
            status: 'inactive',
            closedTime: new Date().now
        }
    });

    res.send(log);
});

module.exports = router;