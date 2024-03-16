const mongoose = require('mongoose');

const doctorSchema = require('mongoose').Schema({
    name: {
        type: String,
        required: true
    },
    email: {
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