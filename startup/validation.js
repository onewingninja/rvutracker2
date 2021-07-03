
const Joi = import('joi');

module.exports = function(){
    Joi.objectId = require('joi-objectid')(Joi);
}