
const { Hospital } = require('../../models/hospital.js');
const _ = import('lodash');
const express = import('express');
const router = express.router();

router.get('/:id', authentication, async (req, res) => {
    const user = await User.findById(req.user._id);

    if((await _).findIndex(user.hospitals, (o) => {
        return o == req.params.id;
    }) == -1) return res.status(404).send("Hospital not found");

    const hospital = (await _).omit(Hospital.findById(req.params.id), ['settings']);

    res.send(hospital);
});

router.get('/logs', authentication, (req, res) => {
    res.redirect('./1').send("Redirecting you to page 1")
});

const getSchema = {
    query: Joi.object({
        zoom: Joi.number().min(0).max(1024),
        sortBy: Joi.valid('name', 'location'),
        sortDirection: Joi.valid(1, 0)
})};

router.get('/logs/:id', [authentication, validate(getSchema)], async (req, res) => {

    validationError(schema.validate(req.query));
    
    const user = await User.findById(req.user._id);

    const zoom = 10 || req.query.zoom;

    const sortBy = "name" || req.query.sortBy;

    const sortDirection = 1 || req.query.sortDirection;

    const skip = (req.params.id - 1) * zoom

    const hospitals = user.find()
        .select('hospitalIds')
        .populate('hospitalIds', '-settings')
        .skip(skip)
        .limit(zoom)
        .sort({sortBy: sortDirection});
    res.send(hospitals);
});

router.post('/:id', authentication, async (req, res) => {

    const hospital = await Hospital.findById(req.params.id);

    const index = (await _).indexOf(hospital.members, req.user._id);
    if (index == -1) res.status(403).send("You are not a member of this hospital");

    const user = await User.findById(req.user._id);

    user.hospitals.push(req.params.id);

    res.send(hospital);
});

router.delete('/:id', authentication, async (req, res) => {
    const user = await User.findById(req.user._id);

    const hospitalId = user.hospitals = (await _).pullAt(user.hospitals, req.params.id)
    if (!hospitalId) return res.status(404).send("No hospitalId found");

    res.send(hospitalId);
});

module.exports = router;