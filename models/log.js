
const Joi = import('joi');
const mongoose = import('mongoose');

exports.logSchema = new mongoose.Schema({
    rvu: Number,
    rvuReq: Number,
    status: {
        enum: ['pending', 'verified', 'denied'],
        default: 'pending'
    },
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
    },
    closedTime: Date,
    time: {
        type: Date,
        default: new Date().now
    }
});

exports.Log = mongoose.model('Log', this.logSchema);

exports.validateLog = function(log){
    const schema = Joi.object({
        rvuReq: Joi.number().min(0),
        task: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(0).max(1024)
    });

    return schema.validate(log, schema);
}