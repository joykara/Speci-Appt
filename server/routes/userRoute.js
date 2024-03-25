const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middlewares/verifyToken");

router.route("/").get((req, res) => {
  res.json("Welcome to the homepage");
});

// Register
router.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists", success: false });
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
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ msg: "User registered successfully", success: true });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ msg: "User does not exist", success: false });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(200).send({ msg: "Invalid password", success: false });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(user.isAdmin);

    // Return response with token
    res.cookie("token", token, { httpOnly: true }).json({
      token: token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin, // Include isAdmin status here
      },
      msg: "Logged in successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ msg: "Something went wrong!", success: false });
  }
});

// Get profile
router.post("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }
    res.status(200).json({
      success: true,
      data: {
        username: user.username,
        email: user.email,
        contact: user.contact,
        address: user.address,
        dob: user.dob,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Error getting user profile:", err);
    res.status(500).json({ msg: "Error getting user profile", success: false });
  }
});

//  Update Profile
router.put("/update", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    // Fields to be updated
    let updateData = {};
    if (req.body.username !== "") updateData.username = req.body.username;
    if (req.body.password !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      updateData.password = hashedPassword;
    }
    if (req.body.email !== "") updateData.email = req.body.email;
    if (typeof req.body.contact !== "undefined")
      updateData.contact = req.body.contact;
    if (req.body.address !== "") updateData.address = req.body.address;
    if (req.body.dob !== "") updateData.dob = req.body.dob;

    // Check for existing user with new email and send error if so
    if (updateData.email && !user.email === updateData.email) {
      let existingUser = await User.findOne({ email: updateData.email });
      if (existingUser) throw Error("User with that email already exists");
    }

    await User.updateOne({ _id: req.body.userId }, updateData);
    res.json({ msg: "Profile updated successfully", success: true });
  } catch (err) {
    console.error("Error updating user profile:", err);
    res
      .status(500)
      .json({ msg: "Error updating user profile", success: false });
  }
});

// Get all Users with Pagination
router.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Parse the page parameter or default to 1
    const limit = parseInt(req.query.limit) || 10; // Parse the limit parameter or default to 10
    const startIndex = (page - 1) * limit;

    const users = await User.find().skip(startIndex).limit(limit);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
    };

    // don't display a user if isAdmin
    users.forEach((user) => {
      if (user.isAdmin) {
        users.splice(users.indexOf(user), 1);
      }
    });
    // sort users A - Z
    users.sort((a, b) => (a.username > b.username ? 1 : -1));

    res
      .status(200)
      .json({
        msg: "Users fetched successfully",
        success: true,
        data: users,
        pagination: pagination,
      });
  } catch (err) {
    console.error("Error getting all users:", err);
    res.status(500).json({ msg: "Error getting all users", success: false });
  }
});

module.exports = router;
