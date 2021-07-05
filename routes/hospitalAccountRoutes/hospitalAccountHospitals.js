
const hospitalAuth = require('../../middleware/hospitalAuth.js');
const authentication = require('../../middleware/authentication.js');
const { Hospital, validateHospital } = require('../../models/hospital.js');
const validationError = require('../../middleware/validationError.js');
const { User } = require('../../models/user.js');
const Fawn = import('fawn');
const _ = import('lodash');
const express = import('express');
const router = express.router();

router.get('/', [authentication, hospitalAuth], (req, res) => {
    res.redirect('/1').send("Redirecting you to page 1");
})

router.get('/:id', [authentication, hospitalAuth], (req, res) => {
    const hospitals = Hospital.find({admin: req.user._id})
})

router.post('/', [authentication, hospitalAuth], async (req, res) => {
    validationError(validateHospital(req.body));

    const hospitalData = (await _).pick(req.body, ['name', 'location'])
    (await _).set(hospitalData, 'admin', req.user._id);

    const hospital = new Hospital(hospitalData);

    hospital.save();

    res.send(hospital);
});

router.put('/:id', [authentication, hospitalAuth], async (req, res) => {
    validationError(validateHospital(req.body));

    let update = (await _).pick(req.body, ['name', 'location', 'rvuSettings', 'settings']);
    (await _).set(update, 'updateTime', new Date().now);

    const user = await User.findById(req.params._id);
    user.hospitals.push(updatedHospital._id);
    
    try{
        Fawn.Task()
        .then(() => {
            const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, {
                $set: update
            }, {new: true});
        })
        .save(user)
        .run();
    }
    catch(ex){
        next(ex);
    }
})

module.exports = router;