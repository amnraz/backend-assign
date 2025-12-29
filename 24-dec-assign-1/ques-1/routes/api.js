const express = require("express");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: { error: "Too many requests, please try again later." },
});

// Public Route (No Rate Limit)
router.get("/public", (req, res) => {
  res.json({ message: "This is a public endpoint!" });
});

// Limited Route (Rate Limited)
router.get("/limited", limiter, (req, res) => {
  res.json({ message: "You have access to this limited endpoint!" });
});

module.exports = router;
