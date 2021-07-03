
const express = import('express');
const router = express.router();
const AppEventEmmiter = require('../middleware/AppEventEmmiter.js');
const emailEmmiter = new AppEventEmmiter();

router.get('/:id', (req, res) => {
    emailEmmiter.appEmit(req.params.id);
    res.send(req.params.id);
});

module.exports = router;