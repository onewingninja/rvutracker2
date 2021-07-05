
const {Joi} = import('express-validation');
const mongoose = import('mongoose');

exports.Hospital = mongoose.model('Hospital', new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    location: {type: String, enum: ["N/A"]},
    admin: mongoose.Schema.Types.ObjectId,
    members: [String],
    rvuSettings: Object,
    updateTime: {
        default: new Date().now
    },
    creationTime: {
        default: new Date().now
    },
    settings: Object
}));

exports.validateHospital = function(hospital){
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).pattern(/[ -~]/).required(),
        location: Joi.string().min(1).max(255).pattern(/[ -~]/).required()
    });

    return schema.validate
}