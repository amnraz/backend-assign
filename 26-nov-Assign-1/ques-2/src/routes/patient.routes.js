const express = require("express");
const router = express.Router();
const patientCtrl = require("../controllers/patient.controller");

router.post("/", patientCtrl.createPatient);
router.get("/:id/doctors", patientCtrl.getPatientDoctors);
router.get("/", patientCtrl.getByGender);
router.delete("/:id", patientCtrl.deletePatient);

module.exports = router;
