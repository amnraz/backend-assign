const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany(
    { courseId: req.params.id },
    { isActive: false }
  );
  res.json({ message: "Course soft deleted" });
};

exports.getCourseStudents = async (req, res) => {
  const enrollments = await Enrollment.find({
    courseId: req.params.id,
    isActive: true
  }).populate("studentId");

  res.json(enrollments.map(e => e.studentId));
};
