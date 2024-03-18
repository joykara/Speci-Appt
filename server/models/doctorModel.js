const mongoose = require('mongoose');

const doctorSchema = require('mongoose').Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: Object,
        required: true
    }
    },
    {
        timestamps: true
    }
);


const doctorModel = mongoose.model('Doctor', doctorSchema);
module.exports = doctorModel;