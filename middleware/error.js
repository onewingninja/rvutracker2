
const {ValidationError} = import('express-validation');
const logger = require('../middleware/logger.js');

module.exports = function(err, req, res, next){
    logger.error(err);
    if (err instanceof ValidationError) 
        return res.status(err.statusCode).json(err);
    
    res.status(500).send("Something failed, please try again.")
}