
const mongoose = import('mongoose');

exports.Line = mongoose.model('Line', new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, enum: ["N/A"]},
    members: [String],
    startTime: Number,
    endTime: Number
}));