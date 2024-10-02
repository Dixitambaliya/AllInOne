const jwt = require('jsonwebtoken');
const secretkey = process.env.NODE_ENV;  

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretkey); // Verify token using the secret key
    req.user = { userid: decoded.userid }; // Attach user data to request object
    next(); // Move to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = isAuthenticated;
