const mongoose = require("../config/db");

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrollmentDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
