const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 5000;


// Load env variables
dotenv.config();

// Connect to database
mongoose
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() =>
        console.log("MongoDB connected"))
    .catch((err) =>
        console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});