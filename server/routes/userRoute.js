const router = require('express').Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.route('/').get((req, res) => {
  res.json('Welcome to the homepage');
})

// Register
router.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ msg: "User already exists", success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            contact: req.body.contact,
            address: req.body.address,
            dob: req.body.dob,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ msg: "User registered successfully", success: true });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ msg: "Server error", success: false });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({ msg: "User does not exist", success: false });
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(200).send({ msg: "Invalid password", success: false });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Return response with token
        res.cookie('token', token, { httpOnly: true })
            .json({ token: token, msg: "Logged in successfully", success: true });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ msg: "Something went wrong!", success: false });
    }
});

module.exports = router;