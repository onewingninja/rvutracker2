
const mongoose = import('mongoose');

exports.Hospital = mongoose.model('Line', new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, enum: ["N/A"]},
    members: [String],
    rvuSettings: Object,
    settings: Object
}));