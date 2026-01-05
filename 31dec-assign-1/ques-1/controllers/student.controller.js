const Student = require("../models/Student");
const Enrollment = require("../models/Enrollment");

exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany(
    { studentId: req.params.id },
    { isActive: false }
  );
  res.json({ message: "Student soft deleted" });
};

exports.getStudentCourses = async (req, res) => {
  const enrollments = await Enrollment.find({
    studentId: req.params.id,
    isActive: true
  }).populate("courseId");

  res.json(enrollments.map(e => e.courseId));
};
