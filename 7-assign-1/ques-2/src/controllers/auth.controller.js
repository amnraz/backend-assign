const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const mailer = require("../config/mailer");
const { generateAuthToken, generateResetToken } = require("../utils/generateToken");

/* SIGNUP */
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashed });

  res.status(201).json({ message: "Signup successful" });
};

/* LOGIN */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ token: generateAuthToken(user._id) });
};

/* FORGOT PASSWORD */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const token = generateResetToken(email);

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await mailer.sendMail({
      to: email,
      subject: "Password Reset",
      html: `<p>Reset your password:</p><a href="${link}">${link}</a>`
    });
  }

  res.json({ message: "If the email exists, a reset link has been sent." });
};

/* RESET PASSWORD */
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

    const user = await User.findOne({
      email: decoded.email,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful" });

  } catch {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
