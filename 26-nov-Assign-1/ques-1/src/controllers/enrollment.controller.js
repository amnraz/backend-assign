const Student = require("../models/student.model");
const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

exports.enroll = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course)
      return res.status(404).json({ message: "Student or Course not found" });

    if (!student.isActive || !course.isActive)
      return res.status(400).json({ message: "Inactive student or course" });

    const enrollment = await Enrollment.create({ studentId, courseId });

    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
