const express = require("express");
const passport = require("passport");
const { githubCallback } = require("../controllers/authController");

const router = express.Router();

// Start GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  githubCallback
);

module.exports = router;
