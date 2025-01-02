const jwt = require("jsonwebtoken");
const SECRET_KEY = "YOUR_SECRET_KEY"; // Replace with an environment variable in real applications

// Mock user for testing
const mockUser = {
  id: 1,
  username: "testUser",
  password: "password123", // Ideally, store hashed passwords
};

const login = (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials
  if (username === mockUser.username && password === mockUser.password) {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { id: mockUser.id, username: mockUser.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Respond with the generated token
      res.json({ token });
    } catch (error) {
      // Handle token generation failure
      res.status(500).json({ error: "Failed to generate token" });
    }
  } else {
    // Respond with unauthorized status for invalid credentials
    res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = { login };
