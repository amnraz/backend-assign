const router = require("express").Router();
const controller = require("../controllers/student.controller");

router.post("/", controller.createStudent);
router.delete("/:id", controller.deleteStudent);
router.get("/:id/courses", controller.getStudentCourses);

module.exports = router;
