
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
        .populate('hospitalIds')
        .skip(skip)
        .limit(zoom)
        .sort({sortBy: sortDirection});
    res.send(hospitals);
});

module.exports = router;