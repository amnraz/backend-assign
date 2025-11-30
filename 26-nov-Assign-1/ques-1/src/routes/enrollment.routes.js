const router = require("express").Router();
const controller = require("../controllers/enrollment.controller");

router.post("/", controller.enroll);

module.exports = router;
