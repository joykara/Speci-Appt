const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const apptRoute = require("./routes/apptRoute");
const doctorsRoute = require("./routes/doctorsRoute");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Welcome to the homepage');
});

app.use('/api/users', userRoute);
app.use('/api/appointments', apptRoute);
app.use('/api/doctors', doctorsRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
