const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connection } = require("./db");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);

// Protected Route Example
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome to protected route!",
    user: req.user
  });
});

// Start Server
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Database connection error:", err);
  }
  console.log(`Server running on port ${process.env.PORT}`);
});
