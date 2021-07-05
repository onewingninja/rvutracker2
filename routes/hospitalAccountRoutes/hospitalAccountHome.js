
const express = import('express');
const router = express.router();

module.exports = router;

router.get('/', [authentication, hospitalAuth], async (req, res) => {
    const user = await User.findById(req.user._id);

    let isMultple = false;

    if (user.hospitals.length > 1) isMultple = true;

    const homeData = (await _).pick(user, ['username', 'name', 'rvu']);
    (await _).set(homeData, 'hospitals', user.hospitals[0]);
    (await _).set(homeData, 'isThereMore', isMultple);

    res.send(homeData);
});