const router = require("express").Router();
const controller = require("../controllers/course.controller");

router.post("/", controller.createCourse);
router.delete("/:id", controller.deleteCourse);
router.get("/:id/students", controller.getCourseStudents);

module.exports = router;
