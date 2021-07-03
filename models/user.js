
const Joi = require('joi');
const { trim } = require('lodash');
const mongoose = require('mongoose');

exports.User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 5,
        maxLength: 50,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 1,
        maxLength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 1,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: "[ -~]",
        minLength: 1,
        maxLength: 1024,
    }
}));

exports.validateUser = function(user){
    const schema = {
        username: Joi.string().min(5).max(50).pattern("[ -~]").required(),
        name: Joi.string().min(1).max(50).pattern("[ -~]").required(),
        email: Joi.string().min(1).max(225).pattern("[ -~]").email().required(),
        password: Joi.string().min(5).max(255).pattern("[ -~]").required()
    }
    return Joi.validate(user, schema);
}