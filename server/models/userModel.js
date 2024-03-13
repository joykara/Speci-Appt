const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
