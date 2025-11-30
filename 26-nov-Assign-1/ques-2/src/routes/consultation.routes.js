const express = require("express");
const router = express.Router();
const consultationCtrl = require("../controllers/consultation.controller");

router.post("/", consultationCtrl.createConsultation);
router.get("/recent", consultationCtrl.getRecentConsultations);

module.exports = router;
