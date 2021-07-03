
const express = import('express');
const logger = require('../middleware/logger.js');
const users = require('../routes/users.js');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', users);
}