const router = require("express").Router();
const controller = require("../controllers/enrollment.controller");

router.post("/enroll", controller.enrollStudent);

module.exports = router;
