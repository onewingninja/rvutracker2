
const express = import('express');
const logger = require('../middleware/logger.js');
const users = require('../routes/users');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/users', users);
}