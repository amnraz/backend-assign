const jwt = require("jsonwebtoken");

exports.generateAuthToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.generateResetToken = (email) =>
  jwt.sign({ email }, process.env.JWT_RESET_SECRET, { expiresIn: "15m" });
