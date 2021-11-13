const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    birth: {
        type: String,
        required: true,
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;