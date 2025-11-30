const Patient = require("../models/patient.model");
const Consultation = require("../models/consultation.model");

// Create Patient
exports.createPatient = async (req, res) => {
  const patient = await Patient.create(req.body);
  res.json(patient);
};

// Get doctors consulted by patient
exports.getPatientDoctors = async (req, res) => {
  const patientId = req.params.id;

  const consultations = await Consultation.find({
    patientId,
    isActive: true
  }).populate("doctorId", "name specialization");

  res.json(consultations);
};

// List all active male patients
exports.getByGender = async (req, res) => {
  const { gender } = req.query;

  const patients = await Patient.find({ gender, isActive: true });

  res.json(patients);
};

// Soft delete patient + cascade
exports.deletePatient = async (req, res) => {
  const patientId = req.params.id;

  await Patient.findByIdAndUpdate(patientId, { isActive: false });
  await Consultation.updateMany({ patientId }, { isActive: false });

  res.json({ message: "Patient & related consultations deactivated" });
};
