const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Payment = require("../models/Payment");
const Medicine = require("../models/Medicine");
const MedicalCertificate = require("../models/MedicalCertificate");
const StockAdjustment = require("../models/StockAdjustment");
const CashClosing = require("../models/CashClosing");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect, authorize("ADMIN", "DOCTOR"));

router.get(
  "/appointments",
  asyncHandler(async (req, res) => {
    const total = await Appointment.countDocuments();
    const confirmed = await Appointment.countDocuments({ status: "CONFIRMED" });
    res.json({ total, confirmed });
  }),
);

router.get(
  "/patients",
  asyncHandler(async (req, res) => {
    const total = await Patient.countDocuments();
    res.json({ total });
  }),
);

router.get(
  "/revenue",
  asyncHandler(async (req, res) => {
    const payments = await Payment.find();
    const total = payments.reduce(
      (sum, payment) => sum + (payment.amountPaid || 0),
      0,
    );
    res.json({ total });
  }),
);

router.get(
  "/medicine-stock",
  asyncHandler(async (req, res) => {
    const medicines = await Medicine.find();
    res.json({
      totalMedicines: medicines.length,
      lowStock: medicines.filter((medicine) => medicine.status === "LOW_STOCK")
        .length,
    });
  }),
);

router.get(
  "/medical-certificates",
  asyncHandler(async (req, res) => {
    const total = await MedicalCertificate.countDocuments();
    res.json({ total });
  }),
);

router.get(
  "/stock-adjustments",
  asyncHandler(async (req, res) => {
    const total = await StockAdjustment.countDocuments();
    res.json({ total });
  }),
);

router.get(
  "/cash-closings",
  asyncHandler(async (req, res) => {
    const total = await CashClosing.countDocuments();
    res.json({ total });
  }),
);

module.exports = router;
