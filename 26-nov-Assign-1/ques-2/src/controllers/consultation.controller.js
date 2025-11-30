const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const Consultation = require("../models/consultation.model");

// Create Consultation
exports.createConsultation = async (req, res) => {
  const { doctorId, patientId } = req.body;

  const doctor = await Doctor.findById(doctorId);
  const patient = await Patient.findById(patientId);

  if (!doctor?.isActive || !patient?.isActive) {
    return res.status(400).json({ message: "Doctor or patient inactive" });
  }

  const consultation = await Consultation.create(req.body);
  res.json(consultation);
};

// Get recent 5 consultations
exports.getRecentConsultations = async (req, res) => {
  const recent = await Consultation.find({ isActive: true })
    .populate("doctorId patientId")
    .sort({ consultedAt: -1 })
    .limit(5);

  res.json(recent);
};
