const { verifyToken } = require("../utils/jwt");

// Middleware to authenticate and verify JWT token
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    console.log("Access Denied");
    return res.status(401).json({ message: "Access Denied" });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  req.user = decoded; // Attach user data to request
  next(); // Proceed to the next route or middleware
};

module.exports = { authenticateJWT };
