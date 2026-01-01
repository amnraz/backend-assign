const express = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");

const router = express.Router();

// POST /add-profile
router.post("/add-profile", async (req, res) => {
  try {
    const { user } = req.body;

    // check if user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all profiles with user details
router.get("/profiles", async (req, res) => {
  const profiles = await Profile.find().populate("user", "name email");
  res.json(profiles);
});

module.exports = router;
