
const validationError = require('../../middleware/validationError.js');
const { Log, validateLog } = require('../../models/log.js');
const { User } = require('../../models/user.js');
const authentication = require('../middleware/authentication.js');
const _ = import('lodash');
const Fawn = import('fawn');
const { validate,  Joi } = import('express-validation');
const express = import('express');
const router = express.router();

router.get('/', authentication, (req, res) => {
    res.redirect('/1').send("Redirecting you to page 1")
});

const getSchema = {
    query: Joi.object({
        zoom: Joi.number().min(0).max(1024),
        sortBy: Joi.valid('time', 'rvu'),
        sortDirection: Joi.valid(1, 0),
        isIncludingInactive: Joi.boolean()
})};

router.get('/:id', [authentication, validate(getSchema)], async (req, res) => {

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
    validationError(validateLog(req.body));

    const user = await User.findById(req.user._id);

    const log = user.logs.push(new Log((await _)
        .pick(req.body, ['rvuReq', 'task', 'description'])));

    res.send(log);
});

router.put('/:id', authentication, async (req, res) => {
    validationError(validateLog(req.body));

    const user = await User.findById(req.user._id);

    const log = await user.logs.findById(req.params.id);
    if (!log) res.status(404).send("Log not found");

    const originalDate = log.time;
    log.closedTime = new Date().now;

    const updatedLog = new Log((await _)
        .pick(req.body, ['rvuReq', 'task', 'description']));
    updatedLog.time = originalDate;

    
    try{
        new Fawn.Task()
        .save(user)
        .then(() => {
            user.logs.push(updatedLog);
        })
        .run();
    }
    catch(ex){
        next(ex);
    }
    
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