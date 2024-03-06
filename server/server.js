const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const router = require('express').Router();
const userRoute = require("./routes/userRoute");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

router.route('/').get((req, res) => {
    res.json('Welcome to the homepage');
})
app.use('/api/user', userRoute)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});