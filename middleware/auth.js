const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.authenticate = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if token is present in the header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, config.jwtSecret);

    // Add the user to the request object
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.authorize = (roles) => (req, res, next) => {
  // Check if user has the required role
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};
