const router = require("express").Router();

router.use("/students", require("./student.routes"));
router.use("/courses", require("./course.routes"));
router.use("/enroll", require("./enrollment.routes"));

module.exports = router;
