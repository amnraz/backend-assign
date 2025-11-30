const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: ObjectId, ref: "Student" },
  courseId: { type: ObjectId, ref: "Course" },
  enrolledAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
