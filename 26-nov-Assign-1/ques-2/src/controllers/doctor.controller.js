const Doctor = require("../models/doctor.model");
const Consultation = require("../models/consultation.model");

// Create Doctor
exports.createDoctor = async (req, res) => {
  const doctor = await Doctor.create(req.body);
  res.json(doctor);
};

// Get patients consulted by doctor
exports.getDoctorPatients = async (req, res) => {
  const doctorId = req.params.id;

  const consultations = await Consultation.find({
    doctorId,
    isActive: true
  })
    .populate("patientId", "name age gender")
    .select("-doctorId")
    .sort({ consultedAt: -1 })
    .limit(10);

  res.json(consultations);
};

// Count consultations
exports.getConsultationCount = async (req, res) => {
  const count = await Consultation.countDocuments({
    doctorId: req.params.id,
    isActive: true
  });

  res.json({ doctorId: req.params.id, totalConsultations: count });
};

// Soft delete doctor + cascade
exports.deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;

  await Doctor.findByIdAndUpdate(doctorId, { isActive: false });
  await Consultation.updateMany({ doctorId }, { isActive: false });

  res.json({ message: "Doctor & related consultations deactivated" });
};
