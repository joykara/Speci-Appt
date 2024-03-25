const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token provided", success: false });
    }

    const secretKey = process.env.JWT_SECRET;
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ msg: "Unauthorized request", success: false });
      } else {
        // Checking user is exist in database or not
        const user = await User.findById(decoded.id);
        if (!user) {
          return res
            .status(401)
            .json({ msg: "Unauthorized request: No  user", success: false });
        }

        req.user = user;
        console.log("Decoded user:", user);
        next();
      }
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

module.exports = verifyToken;
