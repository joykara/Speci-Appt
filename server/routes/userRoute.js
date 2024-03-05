const router = require('express').Router();
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//         // Create JWT
//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };
//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2 days' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (e) {
//         console.log(e.message);
//         return res.status(500).json({ msg: 'Server error' });
//     }
// });

router.route('/').get((req, res) => {
  res.json('Welcome to the homepage');
})

// Register
router.post('/register', async (req, res) => {
    try {
        // Check if user already exists
        let user = await User.findOne({email: email});
        if (user) {
            return res.status(400).json({msg: "User already exists", success: false});
        }

        const password = req.body.password;
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create a new user and save it
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201)
            .send({msg: "User registered successfully", success: true});
    } catch (error) {
        res.status(500).send({msg: "Server error", success: false}, error);
    }
    res.json('User registered');
});

// Login
router.post('/login', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
    res.json('User registered');
});

module.exports = router;