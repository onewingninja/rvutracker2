
const { Hospital } = require('./hospital');
const Joi = import('express-validation');
const mongoose = import('mongoose');

exports.logSchema = new mongoose.Schema({
    rvu: Number,
    rvuReq: Number,
    hospitalId: {
        type: Hospital.find().select('_id'),
        required: true
    },
    hospitalName: {
        type: Hospital.find().select('name'),
        default: function(){
            Hospital.find({
                _id: this.hospitalId})
                .select('name');
        }
    },
    status: {
        enum: ['pending', 'verified', 'denied', 'inactive'],
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

exports.validateLog = function(log, user){
    const schema = Joi.object({
        hospitalId: Joi.valid(user.hospitals_id),
        rvuReq: Joi.number().min(0),
        task: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(0).max(1024)
    });

    return schema.validate(log, schema);
}