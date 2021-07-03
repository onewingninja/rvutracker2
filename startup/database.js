
const config = import('config');
const mongoose = import('mongoose');
const logger = require('../middleware/logger.js');

module.exports = function(){mongoose.connect(config.get('mongodb.url'))
.then(() => 
logger.info(`Connected to MongoDB at ${config.get('mongodb.url')}`))
.catch((err) => {throw new Error
    (`Fatal Error: Could not connect to MongoDB at 
    ${config.get('mongodb.url')} ${err}`)});}