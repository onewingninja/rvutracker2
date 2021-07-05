
const mongoose = import('mongoose');

exports.Hospital = mongoose.model('Hospital', new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    location: {type: String, enum: ["N/A"]},
    members: [String],
    rvuSettings: Object,
    settings: Object
}));