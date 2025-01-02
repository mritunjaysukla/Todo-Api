const jwt = require("jsonwebtoken");

// Secret key for signing JWT tokens
const SECRET_KEY = "YOUR_SECRET_KEY"; // Use a more secure key in production

// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

// Function to verify a JWT token
const verifyToken = (token) => {
  // Remove surrounding quotes if they exist
  token = token.replace(/^"|"$/g, ""); // This removes leading and trailing double quotes
  console.log("Token after removing quotes: ", token); // Debugging output to confirm the token is correct

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
    console.log("Decoded token: ", decoded); // Log the decoded token for verification
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error.message); // Log the error for debugging
    return null; // Return null if the token is invalid or expired
  }
};

module.exports = { generateToken, verifyToken };
