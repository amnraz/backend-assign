const express = require("express");
const limiter = require("../middlewares/rateLimiter");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/forgot-password", limiter, controller.forgotPassword);
router.post("/reset-password/:token", controller.resetPassword);

module.exports = router;
