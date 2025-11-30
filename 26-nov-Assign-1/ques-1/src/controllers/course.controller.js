const Course = require("../models/course.model");
const Enrollment = require("../models/enrollment.model");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await Course.findByIdAndUpdate(id, { isActive: false });
    if (!course) return res.status(404).json({ msg: "Course not found" });

    await Enrollment.updateMany({ courseId: id }, { isActive: false });

    res.json({ msg: "Course soft-deleted and related enrollments updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const id = req.params.id;

    const students = await Enrollment.find({
      courseId: id,
      isActive: true
    })
      .populate("studentId")
      .select("studentId");

    res.json(students.map((s) => s.studentId));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
