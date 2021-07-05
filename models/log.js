
const Joi = import('joi');
const mongoose = import('mongoose');

exports.Log = mongoose.model('Log', new mongoose.Schema({
    rvu: Number,
    task: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true
    },
    description: {
        type: String,
        minLength: 0,
        maxLength: 1024
    }
}));

exports.validateLog = function(log){
    const schema = {
        rvu: Joi.number().min(0),
        task: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(0).max(1024)
    }

    return Joi.validate(log, schema);
}