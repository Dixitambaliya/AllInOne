const jwt = require('jsonwebtoken');
const secretkey = process.env.JWT_SECRET || "asdfghjkl"; // Use environment variable for security

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token; // Safely access token from cookies

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, secretkey);

    // Attach user data to the request object
    req.user = { userid: decoded.userid, email: decoded.email };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token errors
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token', error: err.message });
  }
};

module.exports = isAuthenticated;
