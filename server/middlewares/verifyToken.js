const jwt = require('jsonwebtoken');

const verifyToken = async(req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];

    const secretKey = process.env.JWT_SECRET;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: 'Unauthorized request', success:false });
      }
      else {
        req.body.userId = decoded.id;
        next();
      }
    }
    );
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ msg: 'Server error', success:false });
  }
};

module.exports = verifyToken