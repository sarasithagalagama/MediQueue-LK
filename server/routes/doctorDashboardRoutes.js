const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const doctorController = require("../controllers/doctorController");

// All doctor endpoints require DOCTOR role (or ADMIN can use doctor features)
router.use(protect, authorize("DOCTOR", "ADMIN"));

router.get("/dashboard", doctorController.dashboard);
router.get("/queue", doctorController.queue);
router.get("/current-patient", doctorController.currentPatient);
router.get("/patients", doctorController.patients);
router.get("/consultations", doctorController.consultations);
router.get("/prescriptions", doctorController.prescriptions);
router.get("/certificates", doctorController.certificates);
router.get("/finance", doctorController.finance);
router.get("/medicine-stock", doctorController.medicineStock);
router.get("/stock-alerts", doctorController.stockAlerts);
router.get("/cash-closings", doctorController.cashClosings);

module.exports = router;
