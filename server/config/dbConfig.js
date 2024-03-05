const mongoose = require("mongoose");
require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) =>
    console.log('MongoDB connection error: ', err)
);

module.exports = mongoose;