const express = require("express");
const User = require("../models/User");

const router = express.Router();

/**
 * POST /users
 * Create a new user
 */
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * POST /users/:userId/address
 * Add address to a user
 */
router.post("/users/:userId/address", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.addresses.push(req.body);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * GET /users/summary
 */
router.get("/users/summary", async (req, res) => {
  const users = await User.find();

  const totalUsers = users.length;
  let totalAddresses = 0;

  const userSummary = users.map(user => {
    const count = user.addresses.length;
    totalAddresses += count;
    return {
      name: user.name,
      addressCount: count
    };
  });

  res.json({
    totalUsers,
    totalAddresses,
    users: userSummary
  });
});

/**
 * GET /users/:userId
 * Get full user details
 */
router.get("/users/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

module.exports = router;
